import React, { useState, useEffect } from 'react';
import firebase from '../../config/firebase';
import ProfileImage from '../../assets/Emma.png';
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Input, Button} from "@nextui-org/react";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState('');

  useEffect(() => {
    const authUser = firebase.auth().currentUser;
    if (authUser) {
      const docRef = firebase.firestore().collection('users').doc(authUser.uid);
      docRef.get().then((doc) => {
        if (doc.exists) {
          setUser(doc.data());
        }
      });
    }
  }, []);

  const handlePasswordChange = () => {
    const authUser = firebase.auth().currentUser;
    authUser.updatePassword(password).then(() => {
      alert('Password updated successfully');
    }).catch((error) => {
      alert('Error updating password: ', error);
    });
  };

  // if (!user) {
  //   return <div>Loading...</div>;
  // }


  return (
    <Card className='w-[800px] ml-[250px]' >
      <CardHeader className="flex gap-3">
        <Image
          alt="Profile-pic"
          height={40}
          radius="sm"
          src='../../assets/Emma.png' // for profile pic from firebase -->   <img src={user.profilePic} />
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">User Name</p>
          <p className="text-small text-default-500">username@gmail.com (beta tester)</p>
        </div>
      </CardHeader>
      <Divider/>


      <CardBody>
        {/* <p>Name : {user.name}</p>    */}
        <p>Name : Aman Bhujel</p>
        <p>Date of Birth :</p>
        <p>Gender: </p>

        <Input
            isReadOnly
            type="email"
            variant="bordered"
            // defaultValue={user.email}
            defaultValue='bhujelaman20@gmail.com'

            className="max-w-xs"
        />
        <Divider/>
        <p>Change Password</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
        />
        <Button color="danger" varient="flat" onClick={handlePasswordChange}>Change Password</Button>
      </CardBody>
      <Divider/>


      <CardFooter>     
        <Button color="primary" > Save </Button>
        <Button color="danger" variant="flat" >Close</Button>
      </CardFooter>
    </Card>
  );
  }

export default ProfilePage;

