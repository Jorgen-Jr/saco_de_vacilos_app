import React from 'react';

import Layout from '../Layout';

import UserCard from '../../components/UserCard/';
import NewPost from '../../components/NewPost/';
import Feed from '../../components/Feed/';

// import api from '../../../services/api';

import './style.css';

const Dashboard = () => {
    const posts =[
        {
          "id": 1,
          "author_id": 1,
          "guilty_id": 1,
          "content": "Meu sangue não é -O",
          "initial_balance": 4,
          "status": "P",
          "deserved_count": 24,
          "undeserved_count": 2,
          "view_count": 0,
          "createdAt": "2020-04-12T18:53:02.000Z",
          "updatedAt": "2020-04-12T18:53:02.000Z",
          "comments": [
            {
              "id": 1,
              "user_id": 1,
              "post_id": 1,
              "content": "Modalidade de planos que combrem Enfermaria",
              "createdAt": "2020-04-12T19:22:00.000Z",
              "updatedAt": "2020-04-12T19:22:00.000Z"
            }
          ],
          "author": {
            "name": "James",
            "username": "007",
            "profile": {
              "id": 1,
              "user_id": 1,
              "surname": "Bond",
              "bio": "Agente super secreto.",
              "profile_picture": "/sjodasd/asdasd/asdj.jpg",
              "createdAt": "2020-04-12T18:12:10.000Z",
              "updatedAt": "2020-04-12T18:13:47.000Z"
            }
          },
          "guilty": {
            "name": "James",
            "username": "007"
          },
          "actions": [
            {
              "id": 1,
              "user_id": 1,
              "post_id": 1,
              "action": "U",
              "createdAt": "2020-04-12T19:33:40.000Z",
              "updatedAt": "2020-04-12T19:34:38.000Z"
            }
          ]
        },
        {
          "id": 3,
          "author_id": 1,
          "guilty_id": 1,
          "content": "Vai tomar no c",
          "initial_balance": 4,
          "status": "P",
          "deserved_count": 0,
          "undeserved_count": 0,
          "view_count": 0,
          "createdAt": "2020-04-12T22:59:47.000Z",
          "updatedAt": "2020-04-12T22:59:47.000Z",
          "comments": [
            {
              "id": 3,
              "user_id": 1,
              "post_id": 1,
              "content": "Modalidade de planos que combrem Enfermaria",
              "createdAt": "2020-04-12T19:22:09.000Z",
              "updatedAt": "2020-04-12T19:22:09.000Z"
            }
          ],
          "author": {
            "name": "James",
            "username": "007",
            "profile": {
              "id": 1,
              "user_id": 1,
              "surname": "Bond",
              "bio": "Agente super secreto.",
              "profile_picture": "/sjodasd/asdasd/asdj.jpg",
              "createdAt": "2020-04-12T18:12:10.000Z",
              "updatedAt": "2020-04-12T18:13:47.000Z"
            }
          },
          "guilty": {
            "name": "James",
            "username": "007"
          },
          "actions": []
        },
        {
          "id": 4,
          "author_id": 1,
          "guilty_id": 1,
          "content": "Vai tomar no c",
          "initial_balance": 4,
          "status": "P",
          "deserved_count": 0,
          "undeserved_count": 0,
          "view_count": 0,
          "createdAt": "2020-04-12T22:59:49.000Z",
          "updatedAt": "2020-04-12T22:59:49.000Z",
          "comments": [],
          "author": {
            "name": "James",
            "username": "007",
            "profile": {
              "id": 1,
              "user_id": 1,
              "surname": "Bond",
              "bio": "Agente super secreto.",
              "profile_picture": "/sjodasd/asdasd/asdj.jpg",
              "createdAt": "2020-04-12T18:12:10.000Z",
              "updatedAt": "2020-04-12T18:13:47.000Z"
            }
          },
          "guilty": {
            "name": "James",
            "username": "007"
          },
          "actions": []
        },
        {
          "id": 5,
          "author_id": 1,
          "guilty_id": 1,
          "content": "Vai tomar no c",
          "initial_balance": 4,
          "status": "P",
          "deserved_count": 0,
          "undeserved_count": 0,
          "view_count": 0,
          "createdAt": "2020-04-12T22:59:51.000Z",
          "updatedAt": "2020-04-12T22:59:51.000Z",
          "comments": [],
          "author": {
            "name": "James",
            "username": "007",
            "profile": {
              "id": 1,
              "user_id": 1,
              "surname": "Bond",
              "bio": "Agente super secreto.",
              "profile_picture": "/sjodasd/asdasd/asdj.jpg",
              "createdAt": "2020-04-12T18:12:10.000Z",
              "updatedAt": "2020-04-12T18:13:47.000Z"
            }
          },
          "guilty": {
            "name": "James",
            "username": "007"
          },
          "actions": []
        }
      ];

    return (
        <Layout>
            <div className="app-container">
                <div className="dashboard-container">
                    <div style={{flexGrow:1, maxWidth:"300px"}}>
                        <div>
                            <UserCard />
                        </div>
                    </div>
                    <div style={{flexGrow:1, maxWidth: "unset"}}>
                        <div>
                            <NewPost />
                        </div>
                        <div>
                            <Feed data={posts}/>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default (Dashboard);