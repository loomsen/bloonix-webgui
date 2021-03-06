package Bloonix::Controller::Templates;

use strict;
use warnings;

sub startup {
    my ($self, $c) = @_;

    $c->route->map("/templates/hosts")->to("list");
    $c->route->map("/templates/hosts/search")->to("list");
    $c->route->map("/templates/hosts/create")->to("create");
    $c->route->map("/templates/hosts/options")->to("options");
    $c->route->map("/templates/hosts/:id")->to("view");
    $c->route->map("/templates/hosts/:id/clone")->to("clone");
    $c->route->map("/templates/hosts/:id/merge")->to("merge");
    $c->route->map("/templates/hosts/:id/options")->to("options");
    $c->route->map("/templates/hosts/:id/update")->to("update");
    $c->route->map("/templates/hosts/:id/delete")->to("delete");
    $c->route->map("/templates/hosts/:id/services")->to("services");
    $c->route->map("/templates/hosts/:id/services/create")->to("create_service");
    $c->route->map("/templates/hosts/:id/services/options/:plugin_id")->to("service_options");
    $c->route->map("/templates/hosts/:id/services/:ref_id/update")->to("update_service");
    $c->route->map("/templates/hosts/:id/services/:ref_id/delete")->to("delete_service");
    $c->route->map("/templates/hosts/:id/services/:ref_id/options")->to("service_options");
    $c->route->map("/templates/hosts/:id/clone")->to("clone");
}

sub auto {
    my ($self, $c, $opts) = @_;

    if ($c->user->{role} !~ /^(operator|admin)\z/) {
        $c->plugin->error->no_privileges;
        return undef;
    }

    if ($opts && $opts->{id}) {
        $c->stash->object({
            template => $c->model->database->host_template->find(
                condition => [
                    id => $opts->{id},
                    company_id => $c->user->{company_id}
                ]
            )
        });
        if (!$c->stash->object->{template}) {
            $c->plugin->error->object_does_not_exists;
            return undef;
        }
        if ($opts->{ref_id}) {
            $c->stash->object->{service} = $c->model->database->service_parameter->find(
                condition => [
                    host_template_id => $opts->{id},
                    ref_id => $opts->{ref_id}
                ]
            );
            if (!$c->stash->object->{service}) {
                $c->plugin->error->object_does_not_exists;
                return undef;
            }
            $c->stash->object->{plugin} = $c->model->database->plugin->get(
                $c->stash->object->{service}->{plugin_id}
            );
        }
        if ($opts->{plugin_id}) {
            my $plugin = $c->model->database->plugin->find(
                condition => [
                    id => $opts->{plugin_id},
                    company_id => [ 1, $c->user->{company_id} ]
                ]
            );

            if (!$plugin) {
                $c->plugin->error->object_does_not_exists;
                return undef;
            }

            $c->stash->object->{plugin} = $plugin;
        }
    }

    return 1;
}

sub view {
    my ($self, $c) = @_;

    $c->stash->data($c->stash->object->{template});
    $c->view->render->json;
}

sub list {
    my ($self, $c) = @_;

    my $request = $c->plugin->defaults->request
        or return 1;

    my ($count, $data) = $c->model->database->host_template->by_user_id(
        user => $c->user,
        offset => $request->{offset},
        limit => $request->{limit},
        query => $request->{query},
        sort => $request->{sort},
        order => [ asc => "name" ]
    );

    $c->stash->offset($request->{offset});
    $c->stash->total($count);
    $c->stash->data($data);
    $c->view->render->json;
}

sub options {
    my ($self, $c, $opts) = @_;

    my $callback = sub {
        my $options = shift;
        $c->plugin->template->variables_to_form($options);
    };

    if ($opts && $opts->{id}) {
        $c->plugin->action->options(host_template => $c->stash->object->{template}, $callback);
    } else {
        $c->plugin->action->options("host_template", undef, $callback);
    }
}

sub create {
    my ($self, $c) = @_;

    $c->plugin->action->store_simple("host_template", undef, sub {
        $c->plugin->template->parse_variables(shift);
    });
}

sub update {
    my ($self, $c) = @_;

    $c->plugin->action->store_simple(host_template => $c->stash->object->{template}, sub {
        $c->plugin->template->parse_variables(shift);
    });
}

sub delete {
    my ($self, $c) = @_;

    $c->plugin->action->delete(host_template => $c->stash->object->{template});
}

sub services {
    my ($self, $c, $opts) = @_;

    $c->stash->data(
        $c->model->database->service_parameter->search(
            condition => [ host_template_id => $opts->{id} ]
        )
    );

    $c->view->render->json;
}

sub service_options {
    my ($self, $c, $opts) = @_;

    $c->model->database->service->set(
        $c->stash->object->{plugin},
        $c->stash->object->{service} ? "update" : "create",
        1 # is a template
    );

    if ($opts && $opts->{ref_id}) {
        my $service = $c->stash->object->{service};
        $service->{command_options} = $c->json->decode($service->{command_options});
        if ($service->{location_options}) {
            $service->{location_options} = $c->json->decode($service->{location_options});
        }
        if ($service->{agent_options}) {
            $service->{agent_options} = $c->json->decode($service->{agent_options});
        } else {
            $service->{agent_options} = {};
        }
        $c->stash->data(values => $c->stash->object->{service});
    } else {
        $c->stash->data(values => $c->model->database->service->validator->defaults);
        $c->stash->data->{values}->{agent_options} = {};
    }

    $c->stash->data(options => $c->model->database->service->validator->options);
    $c->view->render->json;
}

sub create_service {
    my ($self, $c, $opts) = @_;

    $c->plugin->token->check
        or return;

    my $data = $c->plugin->service->validate(0, 1)
        or return;

    $data->{host_template_id} = $opts->{id};

    $c->plugin->transaction->begin
        or return;

    my $service;

    eval {
        $service = $c->model->database->service_parameter->create_and_get($data);

        $service->{command_options} = $c->json->decode($service->{command_options});

        if ($service->{location_options}) {
            $service->{location_options} = $c->json->decode($service->{location_options});
        }

        $c->plugin->log_action->create(
            target => "service_parameter",
            data => $service
        );

        my $hosts = $c->model->database->host_template_host->search(
            condition => [ host_template_id => $opts->{id} ]
        );

        foreach my $host (@$hosts) {
            $c->model->database->service->create(
                service_parameter_id => $service->{ref_id},
                updated => 1,
                host_id => $host->{host_id},
                message => "waiting for initialization",
                status => "INFO",
                last_check => time
            );
        }
    };

    if ($@) {
        return $c->plugin->transaction->rollback;
    }

    $c->plugin->transaction->end
        or return;

    $c->stash->data($service);
    $c->view->render->json;
}

sub update_service {
    my ($self, $c, $opts) = @_;

    $c->plugin->token->check
        or return;

    my $data = $c->plugin->service->validate($c->stash->object->{service}, 1)
        or return;

    $c->model->database->service_parameter->update(
        data => $data,
        condition => [ ref_id => $opts->{ref_id} ]
    ) or return $c->plugin->error->action_failed;

    my $service = $c->model->database->service_parameter->find(
        condition => [ ref_id => $opts->{ref_id} ]
    );

    $service->{command_options} = $c->json->decode($service->{command_options});

    if ($service->{location_options}) {
        $service->{location_options} = $c->json->decode($service->{location_options});
    }

    $c->plugin->log_action->update(
        target => "service_parameter",
        old => $c->stash->object->{service},
        data => $service
    );

    $c->stash->data($service);
    $c->view->render->json;
}

sub delete_service {
    my ($self, $c, $opts) = @_;

    $c->plugin->token->check
        or return;

    # DELETE CASCADE should also delete the service from all hosts
    $c->model->database->service_parameter->delete($opts->{ref_id})
        or return $c->plugin->error->action_failed;

    $c->plugin->log_action->delete(
        target => "service_parameter",
        data => $c->stash->object->{service}
    );

    $c->view->render->json;
}

sub clone {
    my ($self, $c, $opts) = @_;

    $c->plugin->token->check
        or return 1;

    my @form_errors;
    my $name = $c->req->param("name");
    my $description = $c->req->param("description");

    if (!$name || length $name > 100) {
        push @form_errors, "name";
    }

    if ($description && length $description > 100) {
        push @form_errors, "description";
    }

    if (@form_errors) {
        return $c->plugin->error->form_parse_errors(@form_errors);
    }

    $c->plugin->transaction->begin
        or return;

    eval {
        my $template = $c->model->database->host_template->create_and_get({
            company_id => $c->user->{company_id},
            name => $name,
            description => $description,
            variables => $c->stash->object->{template}->{variables}
        }) or die;

        my $services = $c->model->database->service_parameter->search(
            condition => [ host_template_id => $opts->{id} ]
        );

        foreach my $service (@$services) {
            delete $service->{ref_id};
            $service->{host_template_id} = $template->{id};
            $c->model->database->service_parameter->create($service)
                or die;
        }
    };

    if ($@) {
        return $c->plugin->transaction->rollback;
    }

    $c->plugin->transaction->end
        or return;

    $c->view->render->json;
}

1;
