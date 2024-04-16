<template>
  <header-component></header-component>
  <div class="profile_user">
    <div class="container">
      <div class="intro h-100">
        <div class="row h-100 align-items-center">
          <div class="col-md-6 ml-3">
            <h3>Tài khoản của tôi</h3>
          </div>
          <div class="col-md-5">
            <!-- <img src="/img/svg/profile.svg" width="300" alt="" class="img-fluid"> -->
          </div>
        </div>
      </div>

      <div class="profile-content">
        <ul class="nav nav-pills ml-3" id="myTab" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" id="profile-tab" data-toggle="tab" href="#profile" role="tab"
              aria-controls="profile" aria-selected="true">Hồ sơ</a>
          </li>

          <!-- <li class="nav-item">
            <a class="nav-link" id="account-tab" data-toggle="tab" href="#account" role="tab" aria-controls="account"
              aria-selected="false">Địa chỉ</a>
          </li> -->
        </ul>

        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active pt-3" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            <div class="container">
              <!-- Nội dung của tab Hồ sơ -->
              <div class="row">
                <div class="col-md-8">
                  <div class="form-group">
                    <label for="">Tên đăng nhập</label>
                    <input type="text" v-model="profile.username" @input="validateForm" placeholder="Tên đăng nhập"
                      class="form-control" />
                    <!-- Hiển thị cảnh báo nếu tên đăng nhập không hợp lệ -->
                    <small v-if="!validateUsername(profile.username)" class="text-danger">Vui lòng nhập tên đăng
                      nhập</small>
                  </div>

                  <div class="form-group">
                    <label for="">Tên</label>
                    <input type="text" name="" v-model="profile.name" placeholder="Tên" class="form-control" />
                  </div>

                  <div class="form-group">
                    <label for="">Số điện thoại</label>
                    <input type="text" v-model="profile.phone" @input="validateForm"
                      placeholder="Số điện thoại" class="form-control" />
                    <!-- Hiển thị cảnh báo nếu số điện thoại không hợp lệ -->
                    <small v-if="!isPhoneNumberValid" class="text-danger">Vui lòng nhập số điện thoại
                      hợp lệ</small>
                  </div>

                  <div class="form-group">
                    <label for="">Email</label>
                    <input type="text" v-model="profile.email" placeholder="Email" class="form-control" disabled />
                  </div>

                  <div class="row">
                    <div class="col-md-3">
                      <label for="">Giới tính:</label>
                    </div>
                    <div class="col-md-3">
                      <div class="form-group">
                        <input type="radio" v-model="profile.gender" value="Nam" />
                        <label for="">Nam</label>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="form-group">
                        <input type="radio" v-model="profile.gender" value="Nữ" />
                        <label for="">Nữ</label>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-3">
                      <label for="">Ngày sinh:</label>
                    </div>
                    <div class="col-md-3">
                      <div class="form-group">
                        <select v-model="day" class="form-control">
                          <option value="">Ngày</option>
                          <option v-for="day in 31" :value="day" :key="day">
                            {{ day }}
                          </option>
                        </select>
                      </div>
                    </div>

                    <div class="col-md-3">
                      <div class="form-group">
                        <select v-model="month" class="form-control">
                          <option value="">Tháng</option>
                          <option v-for="month in 12" :value="month" :key="month">
                            {{ month }}
                          </option>
                        </select>
                      </div>
                    </div>

                    <div class="col-md-3">
                      <div class="form-group">
                        <select v-model="year" class="form-control">
                          <option value="">Năm</option>
                          <option v-for="year in 100" :value="currentYear - year + 1" :key="year">
                            {{ currentYear - year + 1 }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <input type="submit" @click="saveOrUpdateProfile" :disabled="disableSaveButton" value="Lưu"
                      class="btn btn-primary" />
                    <!-- Hiển thị thông báo thành công -->
                    <div v-if="showSuccessMessage" class="alert alert-success mt-2">Lưu thành công!</div>

                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="tab-pane fade pt-3" id="account" role="tabpanel" aria-labelledby="account-tab">
            <div class="container">
              <!-- Nội dung của tab Địa chỉ -->

              <div class="row">
                <div class="categories container">
                  <div class="row">
                    <div class="col-md-1 mt-3">
                      <button class="btn btn-primary" type="button" data-toggle="modal" data-target="#modelId"
                        @click="clearForm">
                        + Thêm mới
                      </button>
                    </div>
                    <div class="col-md-11">
                      <div v-if="addresses.length <= 0">
                        <h3 class="empty_address">Địa chỉ trống</h3>
                      </div>
                      <div v-else>
                        <table class="table table-bordered table-sm">
                          <thead>
                            <tr>
                              <th>STT</th>
                              <th>Tên</th>
                              <th>Số điện thoại</th>
                              <th>Địa chỉ</th>
                              <th>Hành động</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(address, index) in addresses" :key="address.id">
                              <td>{{ index + 1 }}</td>
                              <td>{{ address.fullname }}</td>
                              <td>{{ address.phone_number }}</td>
                              <td>{{ address.address_details }}</td>
                              <td>
                                <button class="btn btn-primary" @click="editAddress(address)" data-toggle="modal"
                                  data-target="#modelId">
                                  Edit
                                </button>
                                <button class="btn btn-primary" @click="Delete(index)">
                                  Delete
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Modal -->
                <div class="modal fade" id="modelId" tabindex="-1" role="dialog" aria-labelledby="modelTitleId"
                  aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">
                          {{ IsAdd ? "Địa chỉ mới" : "Cập nhật địa chỉ" }}
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <form>
                          <div class="row">
                            <div class="col-md-6">
                              <div class="form-group">
                                <input type="text" v-model="fullname" class="form-control" placeholder="Họ tên"
                                  aria-describedby="helpId" />
                                <!-- Hiển thị thông báo lỗi chỉ khi nhấn nút "Hoàn thành" -->
                                <span v-if="showFullNameError && !fullname" class="text-danger">Vui lòng nhập họ
                                  tên</span>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group">
                                <input type="text" v-model="phone_number" class="form-control"
                                  placeholder="Số điện thoại" aria-describedby="helpId" />
                                <!-- Hiển thị thông báo lỗi chỉ khi nhấn nút "Hoàn thành" và số điện thoại không hợp lệ -->
                                <span v-if="showPhoneNumberError && !validatePhoneNumber(phone_number)"
                                  class="text-danger">Vui lòng nhập số điện thoại hợp lệ</span>
                              </div>

                            </div>
                            <div class="col-md-12">
                              <div class="form-group">
                                <input type="text" v-model="address_details" class="form-control"
                                  placeholder="Địa chỉ cụ thể" aria-describedby="helpId" />
                                <!-- Hiển thị thông báo lỗi chỉ khi nhấn nút "Hoàn thành" -->
                                <span v-if="showAddressDetailsError && !address_details" class="text-danger">Vui lòng
                                  nhập địa chỉ cụ thể</span>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div class="modal-footer">
                        <button id="closeButton" type="button" class="btn btn-secondary" data-dismiss="modal">
                          Trở lại
                        </button>
                        <button type="button" class="btn btn-primary" v-if="IsAdd" @click="validateAndAddAddress()">
                          Hoàn thành
                        </button>
                        <div v-if="showDuplicateError" class="alert alert-danger" role="alert">
                          Dữ liệu đã tồn tại trong cơ sở dữ liệu. Vui lòng kiểm tra lại.
                        </div>
                        <button type="button" class="btn btn-primary" v-if="IsUpdate"
                          @click="validateAndUpdateAddress();">
                          Cập nhật
                        </button>


                      </div>
                      <!-- Trong phần HTML của template Vue -->
                      <div v-if="showSuccessAddressMessage" class="alert alert-success mt-2">Thao tác thành công!</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <footer-component></footer-component>
</template>
<script>
import { doc, getDoc, updateDoc, addDoc, collection, setDoc, deleteDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase";
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  name: "ProfileUser",
  components: {
    HeaderComponent,
    FooterComponent

  },
  data() {
    return {
      IsAdd: true,
      IsUpdate: false,

      profile: {
        uid: null,
        username: null,
        name: null,
        phone: null,
        email: null,
        gender: null,
        date: null,
      },
      addresses: [], // Mảng chứa tất cả các địa chỉ của người dùng
      fullname: null,
      phone_number: null,
      // address: null,
      address_details: null,
      day: "",
      month: "",
      year: "",
      currentYear: new Date().getFullYear(),

      addressIdToUpdate: null,
      // indexToUpdate: null,
      showDuplicateError: false, // Biến để kiểm soát hiển thị thông báo lỗi
      disableSaveButton: false, // Biến để kiểm soát tính trạng của nút "Lưu
      showSuccessMessage: false, // Biến để kiểm soát hiển thị của thông báo thành công
      showSuccessAddressMessage: false, // Biến để kiểm soát hiển thị của thông báo thành công khi thêm hoặc cập nhật địa chỉ

      isPhoneNumberValid: true, // Biến để kiểm tra tính hợp lệ của số điện thoại

      showFullNameError: false,
      showPhoneNumberError: false,
      showAddressDetailsError: false,
    };
  },
  computed: {
    formattedDate() {
      if (this.day && this.month && this.year) {
        return `${this.day}-${this.month}-${this.year}`;
      }
      return null;
    },
  },
  created() {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = doc(firestore, "users", user.uid);
        try {
          const userSnapshot = await getDoc(userDoc);
          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            this.profile.username = userData.username;
            this.profile.name = userData.name;
            this.profile.phone = userData.phone;
            this.profile.gender = userData.gender;
            this.profile.email = userData.email;
            this.profile.date = userData.date;
            // Kiểm tra xem userData có thuộc tính date không và không phải null
            if (userData.date) {
              const dateParts = userData.date.split("-");
              this.day = dateParts[0];
              this.month = dateParts[1];
              this.year = dateParts[2];
            }
            // const addressesRef = collection(firestore, "addresses");
            // const querySnapshot = await getDocs(query(addressesRef, where("uid", "==", user.uid)));
            // querySnapshot.forEach((doc) => {
            //   const addressData = doc.data();
            //   this.addresses.push({
            //     id: doc.id,
            //     fullname: addressData.fullname,
            //     phone_number: addressData.phone_number,
            //     address_details: addressData.address_details,
            //   });
            // });
            // console.log(this.addresses);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.log("khong ton tai user data");
      }
    });
  },


  methods: {
    // Cập nhật profile
    updateProfile() {
      const user = auth.currentUser;
      const userDocRref = doc(firestore, "users", user.uid);
      const newData = {
        username: this.profile.username,
        name: this.profile.name ? this.profile.name : null,
        phone: this.profile.phone ? this.profile.phone : null,
        gender: this.profile.gender ? this.profile.gender : null,
        email: this.profile.email,
        date: this.formattedDate,
      };
      updateDoc(userDocRref, newData)
        .then(() => {
          console.log("Update thong tin thanh cong");
        })
        .catch((error) => {
          console.error("Loi update thong tin: ", error);
        });
    },
    // Thêm địa chỉ mới
    addAddress() {
      const user = auth.currentUser;
      const addressRef = collection(firestore, "addresses");
      const newAddressData = {
        uid: user.uid,
        fullname: this.fullname,
        phone_number: this.phone_number,
        address_details: this.address_details,
      };

      // Kiểm tra xem địa chỉ mới có trùng với bất kỳ địa chỉ nào đã có trong cơ sở dữ liệu không
      const isDuplicate = this.addresses.some(address => (
        address.fullname === newAddressData.fullname &&
        address.phone_number === newAddressData.phone_number &&
        address.address_details === newAddressData.address_details
      ));

      if (isDuplicate) {
        // Địa chỉ đã tồn tại trong cơ sở dữ liệu
        this.showDuplicateError = true; // Hiển thị thông báo lỗi
        return;
      }

      // Thêm địa chỉ mới nếu không trùng
      addDoc(addressRef, newAddressData)
        .then((docRef) => {
          // Thêm địa chỉ vào mảng để hiển thị trên bảng
          this.addresses.push({
            id: docRef.id,
            fullname: this.fullname,
            phone_number: this.phone_number,
            address_details: this.address_details,
          });

          this.clearForm();
          // Thêm dòng sau khi thêm địa chỉ thành công
          this.showSuccessAddressMessage = true;
          setTimeout(() => {
            this.showSuccessAddressMessage = false; // Ẩn thông báo thành công sau 3 giây
          }, 3000);

          this.closeModal();
          console.log("Thêm địa chỉ thành công");
        })
        .catch((error) => {
          console.error("Lỗi khi thêm địa chỉ: ", error);
        });
    },


    editAddress(address) {
      this.validateAndUpdateAddress();
      this.showDuplicateError = false;
      this.fullname = address.fullname;
      this.phone_number = address.phone_number;
      this.address_details = address.address_details;
      this.IsAdd = false;
      this.IsUpdate = true;
      this.addressIdToUpdate = address.id;
      console.log(this.addressIdToUpdate);
      //   this.indexToUpdate = index;
    },
    // Cập nhật địa chỉ
    updateAddress() {
      const user = auth.currentUser;
      const addressRef = doc(firestore, "addresses", this.addressIdToUpdate);
      setDoc(
        addressRef,
        {
          uid: user.uid,
          fullname: this.fullname,
          phone_number: this.phone_number,
          address_details: this.address_details,
        },
        { merge: true }
      )
        .then(() => {
          // Cập nhật thông tin địa chỉ trong mảng
          const indexToUpdate = this.addresses.findIndex(
            (address) => address.id === this.addressIdToUpdate
          );
          if (indexToUpdate !== -1) {
            this.addresses[indexToUpdate] = {
              id: this.addressIdToUpdate,
              fullname: this.fullname,
              phone_number: this.phone_number,
              address_details: this.address_details,
            };
          }
          // Thêm dòng sau khi cập nhật địa chỉ thành công
          this.showSuccessAddressMessage = true;
          setTimeout(() => {
            this.showSuccessAddressMessage = false; // Ẩn thông báo thành công sau 3 giây
          }, 3000);

          console.log("Cập nhật địa chỉ thành công");
          console.log(this.addresses);
        })
        .catch((error) => {
          console.error("Lỗi khi cập nhật địa chỉ: ", error);
        });

    },
    Delete(index) {
      const addressRef = doc(firestore, "addresses", this.addresses[index].id);
      deleteDoc(addressRef)
        .then(() => {
          console.log("Đã xóa địa chỉ thành công");
          this.addresses.splice(index, 1);
        })
        .catch((error) => {
          console.error("Lỗi khi xóa địa chỉ: ", error);
        });
    },


    // Phương thức để gọi khi muốn kiểm tra và thêm địa chỉ mới
    // validateAndAddAddress() {
    //   // Thiết lập biến để hiển thị thông báo lỗi khi nhấn nút "Hoàn thành"
    //   this.showFullNameError = !this.fullname;
    //   this.showPhoneNumberError = !this.validatePhoneNumber(this.phone_number);
    //   this.showAddressDetailsError = !this.address_details;

    //   // Kiểm tra các trường có được nhập đầy đủ không và số điện thoại hợp lệ không
    //   if (!this.fullname || !this.phone_number || !this.address_details || !this.validatePhoneNumber(this.phone_number)) {
    //     return; // Dừng việc thêm địa chỉ nếu có lỗi
    //   }

    //   // Nếu không có lỗi, thực hiện hàm thêm địa chỉ mới
    //   this.addAddress();

    // },
    // Phương thức để gọi khi muốn kiểm tra và thêm địa chỉ mới
    // validateAndUpdateAddress() {
    //   // Thiết lập biến để hiển thị thông báo lỗi khi nhấn nút "Hoàn thành"
    //   this.showFullNameError = !this.fullname;
    //   this.showPhoneNumberError = !this.validatePhoneNumber(this.phone_number);
    //   this.showAddressDetailsError = !this.address_details;

    //   // Kiểm tra các trường có được nhập đầy đủ không và số điện thoại hợp lệ không
    //   if (!this.fullname || !this.phone_number || !this.address_details || !this.validatePhoneNumber(this.phone_number)) {
    //     return; // Dừng việc thêm địa chỉ nếu có lỗi
    //   }

    //   // Nếu không có lỗi, thực hiện hàm thêm địa chỉ mới
    //   this.updateAddress();

    // },



    // Kiểm tra tính hợp lệ của số điện thoại
    
    validatePhoneNumber(phoneNumber) {
      const phoneNumberPattern = /^0\d{9}$/; // Mẫu số điện thoại 10 chữ số
      return phoneNumberPattern.test(phoneNumber);
    },
    validateUsername(username) {
      return username && username.trim() !== ""; // Kiểm tra xem tên đăng nhập có rỗng không
    },
    validateForm() {
     // Kiểm tra các trường dữ liệu và ẩn nút "Lưu" nếu có trường nào không hợp lệ
  this.disableSaveButton = !this.validatePhoneNumber(this.profile.phone) || !this.validateUsername(this.profile.username);
  // Kiểm tra số điện thoại hợp lệ
  this.isPhoneNumberValid = this.validatePhoneNumber(this.profile.phone);
    },
    // Phương thức để gọi khi muốn lưu hoặc cập nhật thông tin
    saveOrUpdateProfile() {
      if (!this.disableSaveButton) {
        this.showSuccessMessage = true; // Hiển thị thông báo thành công
        this.updateProfile();
        setTimeout(() => {
          this.showSuccessMessage = false; // Ẩn thông báo thành công sau 3 giây
        }, 3000);
      }

    },
    closeModal() {
      const closeButton = document.getElementById('closeButton');
      if (closeButton) {
        closeButton.click();
      }
    },
    // reset form (ẩn trạng thái editing)
    clearForm() {
      this.IsAdd = true;
      this.IsUpdate = false;
      this.fullname = "";
      this.phone_number = "";
      this.address_details = "";
      this.showFullNameError = false;
      this.showPhoneNumberError = false;
      this.showAddressDetailsError = false;
    },
  },
};
</script>
<style scoped>
.empty_address {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
}
</style>
