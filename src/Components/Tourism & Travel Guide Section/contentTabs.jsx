import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import OverView from './OverView';
import OurPackages from './OurPackages';
import MeetOurGuidesSection from '../Meet our guides/MeetOurGuidesSection';

export default function ContentTabs() {
    return (
        <Tabs>
            <TabList>
                <Tab>Overview</Tab>
                <Tab>Our Packages</Tab>
                <Tab>Meet Our Tour Guides</Tab>
            </TabList>

            <TabPanel className={'mt-6'}>
                <OverView />
            </TabPanel>
            <TabPanel>
                <OurPackages />
            </TabPanel>
            <TabPanel>
                <MeetOurGuidesSection />
            </TabPanel>
        </Tabs>
    )
}
