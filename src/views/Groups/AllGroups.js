import React from 'react';
import GroupCard from '../../components/Card/GroupProfileCard'
import GroupSidenav from './GroupSidenav'


function AllGroups(props){
    return (
        <div class="container-fluid">
            <div class="row justify-content-evenly">
                <div class="col-12 col-lg-3">
                    <GroupSidenav username={props.username}/>
                </div>
                <div class="col col-lg-9 pb-5 p-3">
                    <div class="d-flex flex-column justify-content-center w-100 " id="d-flex-postcontainer-allGroups">
                        <h5><strong>Discover all groups you can join</strong></h5>
                        <GroupCard />
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default AllGroups;

