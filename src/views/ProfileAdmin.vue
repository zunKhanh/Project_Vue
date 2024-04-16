<template>
    <div class="products">
        <div class="container">
            
          <div class="intro h-100">
              <div class="row h-100 align-items-center">
                <div class="col-md-6 ml-3">
                      <h3>Profile settings</h3>
                      
                   <p>
                     Change your profile settings here
                   </p>
                </div>
                <div class="col-md-5">
                    <!-- <img src="/img/svg/profile.svg" width="300" alt="" class="img-fluid"> -->
                </div>
              </div>
            </div>
  
  
            <div class="profile-content">
  
            <ul class="nav nav-pills ml-3" id="myTab" role="tablist">
  
              <li class="nav-item">
                <a class="nav-link active" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="true">Profile</a>
              </li>
  
              <!-- <li class="nav-item">
                <a class="nav-link"  id="account-tab" data-toggle="tab" href="#account" role="tab" aria-controls="account" aria-selected="false">Account settings</a>
              </li> -->
             
            </ul>
  
              <div class="tab-content" id="myTabContent">
                  <div class="tab-pane fade show active pt-3" id="profile" role="tabpanel" aria-labelledby="profile-tab">
  
                    <div class="container">
                        <div class="row">
                          
                          <div class="col-md-6">
                            <div class="form-group">
                              <input type="text" name="" v-model="profile.name" placeholder="Full name" class="form-control">
                            </div>
                          </div>
  
                          <div class="col-md-6">
                            <div class="form-group">
                              <input type="text"  v-model="profile.phone" placeholder="Phone" class="form-control">
                            </div>
                          </div>
  
                          <div class="col-md-12">
                            <div class="form-group">
                              <input type="text"  v-model="profile.address" placeholder="Address" class="form-control">
                            </div>
                          </div>
  
                          <!-- <div class="col-md-8">
                            <div class="form-group">
                              <input type="text"  v-model="profile.postCode" placeholder="Postcode" class="form-control">
                            </div>
                          </div> -->
                          <div class="col-md-4">
                            <div class="form-group">
                                <input type="button" @click="resetPassword" value="Reset password email" class="btn btn-success w-100">
                            </div>
                          </div>
  
                          <div class="col-md-4">
                            <div class="form-group">
                                <input type="submit" @click="updateProfile" value="Save Changes" class="btn btn-primary w-100">
                            </div>
                          </div>
  
                        </div>
                    </div>
                  
                  </div>
  
                  <!-- <div class="tab-pane fade pt-3" id="account" role="tabpanel" aria-labelledby="account-tab">
                    <div class="container">
                        <div class="row">
                          <div class="col-md-">
                              <div class="alert alert-info">
                                Please use the Reset password email button for reseting the password. The form doens't work currently
                              </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group">
                              <input type="text"  v-model="account.name" placeholder="User name" class="form-control">
                            </div>
                          </div>
  
                          <div class="col-md-6">
                            <div class="form-group">
                              <input type="text"  v-model="account.email" placeholder="Email address" class="form-control">
                            </div>
                          </div>
  
                          <div class="col-md-6">
                            <div class="form-group">
                              <input type="text"  v-model="account.password" placeholder="New password" class="form-control">
                            </div>
                          </div>
  
                          <div class="col-md-6">
                            <div class="form-group">
                              <input type="text" v-model="account.confirmPassword"  placeholder="Confirm password" class="form-control">
                            </div>
                          </div>
  
                          <div class="col-md-4">
                            <div class="form-group">
                                <input type="file" @change="uploadImage" class="form-control">
                             </div>
                          </div>
  
                          <div class="col-md-4">
                            <div class="form-group">
                                <input type="submit" value="Save Changes" class="btn btn-primary w-100">
                            </div>
                          </div>
  
                          <div class="col-md-4">
                            <div class="form-group">
                                <input type="button" @click="resetPassword" value="Reset password email" class="btn btn-success w-100">
                            </div>
                          </div>
                        </div>
                    </div>
                  </div> -->
  
              </div>
              
            </div>
  
        </div>
  
      
    </div>
  </template>
  
  <script>
//   import { VueEditor } from "vue2-editor";
import {  doc, getDoc, updateDoc   } from "firebase/firestore";
import { auth,firestore} from "../firebase";
import { useStore } from "vuex";
export default {
  name: "ProfileAdmin",
  data() {
    return {
      profile: {
        name: null,
        phone: null,
        address: null,
      },
      // account: {
      //   name: null,
      //   email: null,
      //   photoUrl: null,
      //   emailVerified: null,
      //   password: null,
      //   confirmPassword: null,
      //   uid: null,
      // },
    };
  },
  created() {
    const user = auth.currentUser;
    
      this.profile.uid = user.uid; // Lưu uid vào biến profile trong data
      // Lấy thông tin của người dùng từ Firestore
     
      const userDocRef = doc(firestore, "users", user.uid);
      getDoc(userDocRef)
        .then((doc) => {
          if (doc.exists()) {
            const userData = doc.data();
            this.profile.name = userData.name;
            this.profile.phone = userData.phone;
            this.profile.address = userData.address;
            // Có thể cập nhật thêm các trường thông tin khác tại đây nếu cần
          } else {
            console.log("Khong ton tai du lieu ");
          }
        })
        .catch((error) => {
          console.log("Loi lay du lieu", error);
        });
   
  },
  methods:{
    updateProfile(){
        const user = auth.currentUser;
          const userDocRref = doc(firestore, "users", user.uid);
          const newData = {
            name : this.profile.name,
            phone : this.profile.phone,
            address : this.profile.address
          };
          updateDoc(userDocRref, newData)
          .then(() => {
            console.log("Update thong tin thanh cong");
          })
          .catch((error) => {
            console.error("Loi update thong tin: ", error);
          });
      },
      
  },
  setup(){
    const store = useStore();
    const user = auth.currentUser.email;
    console.log(user);
    const resetPassword = () => {
    if (user) {
      store.dispatch("resetPassword", user)
    } else {
      console.error("User or user's email is invalid.");
    }
  };

      return {
        resetPassword
    };
  }
};
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped >
  
  </style>