package Bloonix::Model::Database;

use strict;
use warnings;
use base qw(Bloonix::Accessor);
use base qw(Bloonix::DBI::ClassLoader);

sub load {
    my $self = shift;

    return (
        chart => "Bloonix::Model::Schema::Chart",
        chart_view => "Bloonix::Model::Schema::ChartView",
        company => "Bloonix::Model::Schema::Company",
        contact => "Bloonix::Model::Schema::Contact",
        contact_contactgroup => "Bloonix::Model::Schema::ContactContactgroup",
        contactgroup => "Bloonix::Model::Schema::Contactgroup",
        contact_timeperiod => "Bloonix::Model::Schema::ContactTimeperiod",
        dependency => "Bloonix::Model::Schema::Dependency",
        group => "Bloonix::Model::Schema::Group",
        host => "Bloonix::Model::Schema::Host",
        host_contactgroup => "Bloonix::Model::Schema::HostContactgroup",
        host_downtime => "Bloonix::Model::Schema::HostDowntime",
        host_group => "Bloonix::Model::Schema::HostGroup",
        host_secret => "Bloonix::Model::Schema::HostSecret",
        host_template => "Bloonix::Model::Schema::HostTemplate",
        host_template_host => "Bloonix::Model::Schema::HostTemplateHost",
        location => "Bloonix::Model::Schema::Location",
        plugin => "Bloonix::Model::Schema::Plugin",
        plugin_stats => "Bloonix::Model::Schema::PluginStats",
        roster => "Bloonix::Model::Schema::Roster",
        #roster_contact => "Bloonix::Model::Schema::RosterContact",
        #roster_entry => "Bloonix::Model::Schema::RosterEntry",
        #roster_host => "Bloonix::Model::Schema::RosterHost",
        #roster_service => "Bloonix::Model::Schema::RosterService",
        service => "Bloonix::Model::Schema::Service",
        service_contactgroup => "Bloonix::Model::Schema::ServiceContactgroup",
        service_downtime => "Bloonix::Model::Schema::ServiceDowntime",
        service_parameter => "Bloonix::Model::Schema::ServiceParameter",
        session => "Bloonix::Model::Schema::Session",
        sms_send => "Bloonix::Model::Schema::SMSSend",
        timeperiod => "Bloonix::Model::Schema::Timeperiod",
        timeslice => "Bloonix::Model::Schema::Timeslice",
        token => "Bloonix::Model::Schema::Token",
        user => "Bloonix::Model::Schema::User",
        user_chart => "Bloonix::Model::Schema::UserChart",
        user_group => "Bloonix::Model::Schema::UserGroup",
        user_secret => "Bloonix::Model::Schema::UserSecret",
        user_tracking => "Bloonix::Model::Schema::UserTracking",

        # for testing, do not delete it
        test => "Bloonix::Model::Schema::Test",

        # Upgrade the database schema
        upgrade => "Bloonix::Model::Schema::Upgrade"
    );
}

1;
