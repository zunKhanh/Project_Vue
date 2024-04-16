<template lang="">
  <div class="container-fluid">
   
 
   <div class="row mt-3">
   <div class="col-md-6">
     <div class="form-group">
       <label for="search">Tìm kiếm sản phẩm:</label>
       <input type="text" v-model="searchKeyword" @keyup.enter="searchProducts" class="form-control" id="search" placeholder="Nhập từ khóa tìm kiếm">
     </div>
   </div>
 </div>
 <div class="row">
   <div class="col-md-6">
     <div class="form-group">
       <label for="priceFrom">Giá từ</label>
       <input type="number" v-model="priceFromInput" @keyup.enter="searchProducts" class="form-control" id="priceFrom" placeholder="Nhập giá từ">
     </div>
   </div>
   <div class="col-md-6">
     <div class="form-group">
       <label for="priceTo">Giá đến</label>
       <input type="number" v-model="priceToInput" @keyup.enter="searchProducts" class="form-control" id="priceTo" placeholder="Nhập giá đến">
       <small id="priceToHelp" class="form-text text-danger" v-if="priceError">Giá bắt đầu phải nhỏ hơn giá kết thúc.</small>
     </div>
   </div>
 </div>
 
   <div class="row">
     <div class="col-md-6 mt-3">
       <h3 class="mb-0">Danh sách sản phẩm</h3>
     </div>
     <div class="col-md-6 mt-3 d-flex justify-content-end">
       <button class="btn btn-primary" type="button" data-toggle="modal" data-target="#modelId" @click="openAddModal()">Thêm mới</button>
     </div>
   </div>
 
   <div class="row mt-3">
     <div class="col-md-12">
       <table class="table table-bordered table-sm">
         <thead class="thead-dark">
           <tr>
             <th>STT</th>
             <th>Ảnh</th>
             <th>Tên sản phẩm</th>
             <th>Loại sản phẩm</th>
             <th>Size</th>
             <th>Ngày</th>
             <th>Giá</th>
             <th>Mô tả</th>
             <th>Ảnh sản phẩm</th>
             <th>Hành động</th>
           </tr>
         </thead>
 
         <tbody>
           <tr v-for="(product, index) in displayedProducts" :key="index">
             <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
             <td scope="row"><img :src="getImageUrl(product.image)" width="80px" height="80px" alt="Product Image"></td>
             <td>{{ product.name }}</td>
             <td>{{ product.category }}</td>
             <td>
               <ul>
                 <li v-for="size in product.sizes" :key="size.size">{{ size.size }} ({{ size.quantity }})</li>
               </ul>
             </td>
             <td>{{ product.dateAvailable }}</td>
             <td>{{ product.price }}</td>
             <td>{{ product.productDescription }}</td>
             <td>
               <div v-for="thumbnail in product.thumbnail" :key="thumbnail">
                 <img :src="getImageUrl(thumbnail)" width="50px" alt="">
               </div>
             </td>
             <td>
               <button class="btn btn-primary" @click="editOrOpenEditModal(product)" data-toggle="modal" data-target="#modelId">Edit</button>
               <button class="btn btn-danger btn-sm" @click="Delete(product)">Xóa</button>
             </td>
           </tr>
         </tbody>
       </table>
       <div class="pagination justify-content-center">
         <button class="btn btn-info" @click="firstPage()" :disabled="currentPage === 1">First</button>
         <button class="btn btn-info" @click="prev()" :disabled="currentPage === 1">Previous</button>
         <button class="btn btn-info" @click="next()" :disabled="currentPage === pageCount">Next</button>
         <button class="btn btn-info" @click="lastPage()" :disabled="currentPage === pageCount">Last</button>
       </div>
     </div>
   </div>
 </div>
   <div class="modal fade" id="modelId" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true" :class="{ show: modalVisible }">
   <div class="modal-dialog modal-lg" role="document">
     <div class="modal-content">
       <div class="modal-header bg-primary text-white">
         <h5 class="modal-title">{{ IsAdd ? 'Thêm mới sản phẩm' : 'Chỉnh sửa sản phẩm' }}</h5>
         <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
           <span aria-hidden="true">&times;</span>
         </button>
       </div>
       <div class="modal-body">
         <form @submit.prevent="submitForm">
     <div class="form-row">
       <div class="col-md-6">
         <div class="form-group">
     <label for="productName">Tên sản phẩm</label>
     <input type="text" v-model="productName" @input="clearError('productName')" class="form-control" id="productName" placeholder="Nhập tên sản phẩm">
     <small class="text-danger">{{ errorMessage.productName }}</small>
   </div>
       </div>
 
       <div class="col-md-6">
         <div class="form-group">
     <label for="productDate">Ngày</label>
     <input type="date" v-model="productDate" @input="clearError('productDate')" class="form-control" id="productDate" placeholder="Chọn ngày">
     <small class="text-danger">{{ errorMessage.productDate }}</small>
   </div>
       </div>
 
       <div class="col-md-6">
         <div class="form-group">
           <label for="productPrice">Giá</label>
           <input type="number" v-model="productPrice" @input="clearError('productPrice')" class="form-control" id="productPrice" placeholder="Nhập giá">
           <small class="text-danger">{{ errorMessage.productPrice }}</small>
         </div>
       </div>
 
       <div class="col-md-6">
         <div class="form-group">
           <label for="productDescription">Mô tả</label>
           <input type="text" v-model="productDescription" @input="clearError('productDescription')" class="form-control" id="productDescription" placeholder="Nhập mô tả">
           <small class="text-danger">{{ errorMessage.productDescription }}</small>
         </div>
       </div>
       <div class="col-md-6">
   <div class="form-group">
     <label for="productCategory">Loại sản phẩm</label>
     <select v-model="productCategory" @input="handleProductCategoryInput($event.target.value)" class="form-control" id="productCategory">
       <option v-for="category in categories" :value="category.category" :key="category.id">{{ category.category }}</option>
     </select>
     <small class="text-danger">{{ errorMessage.productCategory }}</small>
   </div>
 </div>
 
 
 <div class="col-md-12">
   <div class="form-group">
     <label for="productSize">Size & Số lượng tồn</label>
     <div v-for="(size, index) in productSizes" :key="index" class="form-row align-items-center mb-2">
       <div class="col-md-4">
         <select class="form-control" v-model="size.size" @input="handleSizeInput(index)" placeholder="Chọn size">
           <option v-for="option in sizes" :key="option.id" :value="option.size">{{ option.size }}</option>
         </select>
       </div>
       <div class="col-md-4">
         <input type="number" class="form-control" v-model="size.quantity" placeholder="Nhập vào số lượng tồn">
       </div>
     </div>
     <small class="text-danger">{{ errorMessage.productSizes }}</small>
   </div>
 </div>
 
 
       <div class="col-md-6">
       <div class="form-group">
         <label for="productImage">Ảnh</label>
         <input type="file" @change="onFileChange" class="form-control-file" id="productImage" aria-describedby="fileHelpId">
       </div>
       <img v-if="imageUrl" :src="imageUrl" width="100px" class="mt-2" alt="" @change="clearError('imageUrl')">
       <small class="text-danger">{{ errorMessage.imageUrl }}</small>
     </div>
 
 
 <div class="col-md-6">
   <div class="form-group">
     <label for="productThumbnail">Ảnh sản phẩm chi tiết</label>
     <input type="file" @change="onThumbnailChange" class="form-control-file" multiple id="productThumbnail" aria-describedby="fileHelpId">
   </div>
   <div v-if="isThumbnailSelected" class="mt-2">
     <div class="row">
       <div class="col-md-3" v-for="(thumbnail, index) in thumbnailUrls" :key="index">
         <img :src="thumbnail" class="img-thumbnail" width="100px" alt="Thumbnail Image">
       </div>
     </div>
   </div>
   <small class="text-danger">{{ errorMessage.thumbnailUrls }}</small>
 </div>
 
     </div>
 
    
   </form>
       </div>
       <div class="modal-footer">
         <button type="button" class="btn btn-success" @click="addSizeToUpdate">Thêm size</button>
         <button type="submit" class="btn btn-primary" @click="handleSubmit">{{ IsAdd ? 'Thêm mới' : 'Cập nhật' }}</button>
         <button type="button" class="btn btn-primary" v-if="IsUpdate" @click="Update()">Cập nhật</button>
         <button id="closeButton" type="button" class="btn btn-secondary" data-dismiss="modal" @click="resetForm()">Đóng</button>
       </div>
     </div>
   </div>
 </div>
 
 
   </template>
 <script>
  export default {
    name: "ProductsView",
    data() {
   return {
     errorMessage: {
       productName: '',
       productDate: '',
       productPrice: '',
       productDescription: '',
       productCategory: '',
       productSizes: '',
       imageUrl: '',
       thumbnailUrls: '',
       priceError: false
     },
     categories: [], // Mảng lưu trữ danh sách loại sản phẩm
     sizes: [], // Mảng lưu trữ danh sách các size sản phẩm
 
     sanpham: [],
     productName: "",
     productDate: "",
     productPrice: "",
     productDescription: "",
     imageUrl: "",
     IsAdd: true,
     IsUpdate: false,
     modalVisible: false,
     itemsPerPage: 10,
     currentPage: 1,
     loaisp: "",
     searched: false,
     searchKeyword: "",
     searchedProducts: [],
     priceFrom: null,
     priceTo: null,
     thumbnailUrls: [],
     isThumbnailSelected: false,
     thumbnailFiles: [], // Biến lưu trữ tệp thumbnail đã chọn
     productCategory: "", // Biến lưu trữ loại sản phẩm của sản phẩm mới
     modalType: 'add', // Thêm thuộc tính modalType để xác định trạng thái của modal (add hoặc edit)
     productToUpdate: null, // Biến lưu trữ thông tin sản phẩm để cập nhật
     tempThumbnailUrls: [], // Biến tạm thời lưu trữ ảnh thumbnail khi mở modal chỉnh sửa
     productSizes: [{ size: "", quantity: "" }],
     priceFromInput: null, // Biến trung gian cho giá bắt đầu
     priceToInput: null, // Biến trung gian cho giá kết thúc
   };
 },
 
    mounted() {
      this.fetchData(); // Gọi phương thức fetchData khi component được tạo
      this.fetchCategories();
      this.fetchSizes();
 
    },
    computed: {
   isProductSizesValid() {
     // Kiểm tra xem mỗi phần tử trong productSizes có size và quantity không và không âm
     return this.productSizes.every(size => size.size !== "" && size.quantity !== "" && size.quantity >= 0);
   },
   isPriceValid() {
     // Kiểm tra xem giá không được để trống và không nhập số âm
     return this.productPrice !== "" && this.productPrice >= 0;
   },
 
   pageCount() {
     // Tính số trang dựa trên danh sách sản phẩm đã lọc (searchedProducts) nếu đã thực hiện tìm kiếm, ngược lại, sử dụng danh sách sản phẩm ban đầu (sanpham)
     const products = this.searched ? this.searchedProducts : this.sanpham;
     return Math.ceil(products.length / this.itemsPerPage);
   },
 
   displayedProducts() {
     // Sử dụng danh sách sản phẩm ban đầu (sanpham) nếu chưa có từ khóa tìm kiếm, ngược lại, sử dụng danh sách sản phẩm đã lọc (searchedProducts)
     const products = this.searched ? this.searchedProducts : this.sanpham;
     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
     const endIndex = startIndex + this.itemsPerPage;
     return products.slice(startIndex, endIndex);
   }
 },
 
    watch: {
      searchKeyword: function(newKeyword, oldKeyword) {
        if (newKeyword !== oldKeyword) {
          this.searchProducts();
        }
      },
    },
    methods: {
     handleSizeInput(index) {
     this.productSizes[index].size = event.target.value;
     this.clearError('productSizes');
   },
     handleProductCategoryInput(value) {
     this.clearError('productCategory');
     this.productCategory = ''; // Xóa giá trị hiện tại
     this.$nextTick(() => {
       this.productCategory = value; // Đặt giá trị mới
     });
   },
     clearError(field) {
     this.errorMessage[field] = ''; // Xóa thông báo lỗi của trường đã nhập liệu
   },
     handleSubmit() {
     if (this.IsAdd) {
       // Nếu đang trong trạng thái "Thêm mới", kiểm tra lỗi trước khi thêm mới sản phẩm
       this.validateForm();
       if (this.isFormValid()) {
         this.Add();
       }
     } else {
       // Nếu đang trong trạng thái "Cập nhật", thực hiện hành động cập nhật
       this.Update();
     }
   },
     submitForm() {
       this.validateForm();
       if (this.isFormValid()) {
         console.log('Form submitted successfully');
       } else {
         console.log('Form submission failed');
       }
     },
     validateForm() {
       this.errorMessage = {};
 
       if (!this.productName.trim()) {
         this.errorMessage.productName = 'Vui lòng nhập vào tên sản phẩm';
       }
       if (!this.productDate) {
         this.errorMessage.productDate = 'Vui lòng chọn ngày';
       }
       if (!this.productPrice || this.productPrice <= 0) {
         this.errorMessage.productPrice = 'Vui lòng nhập giá sản phẩm và giá không âm';
       }
       if (!this.productDescription.trim()) {
         this.errorMessage.productDescription = 'Vui lòng nhập mô tả sản phẩm';
       }
       if (!this.productCategory.trim()) {
         this.errorMessage.productCategory = 'Vui lòng chọn loại sản phẩm';
       }
       if (this.productSizes.some(size => !size.size || !size.quantity)) {
         this.errorMessage.productSizes = 'Vui lòng chọn size và nhập số lượng tồn cho tất cả các size';
       }
       if (!this.imageUrl) {
         this.errorMessage.imageUrl = 'Vui lòng chọn ảnh sản phẩm';
       }
       if (this.thumbnailUrls.length === 0) {
         this.errorMessage.thumbnailUrls = 'Vui lòng chọn ít nhất một ảnh chi tiết sản phẩm';
       }
     },
     isFormValid() {
       return Object.values(this.errorMessage).every(message => message === '');
     },
 
     async Add() {
    try {
      // Kiểm tra các trường nhập liệu
      if (!this.productName) {
             this.errorMessage = "Vui lòng nhập tên sản phẩm";
             return; // Ngăn chặn thực hiện các hành động tiếp theo nếu có lỗi
         }
 
      // Tạo đối tượng sản phẩm mới
      const newProduct = {
        image: `/images/${this.imageUrl.name}`,
        name: this.productName,
        dateAvailable: this.productDate,
        price: this.productPrice,
        category: this.productCategory,
        productDescription: this.productDescription,
        thumbnail: this.thumbnailFiles.map(file => `/images/${file.name}`),
        sizes: this.productSizes
      };
 
      // Gửi yêu cầu POST đến server để thêm mới sản phẩm
      const response = await fetch('http://localhost:3000/sanpham', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
      });
 
      // Kiểm tra xem yêu cầu có thành công hay không
      if (!response.ok) {
        throw new Error('Không thể thêm mới sản phẩm');
      }
 
      // Sau khi thêm mới thành công, làm mới dữ liệu và đóng modal
      await this.fetchData();
      this.closeModal();
    } catch (error) {
      // Nếu có lỗi xảy ra, hiển thị thông báo lỗi và đặt lại form
      console.error(error);
      alert('Đã xảy ra lỗi: ' + error.message);
    }
 },
     checkPriceRange() {
             if (this.priceFrom !== null && this.priceTo !== null && this.priceFrom >= this.priceTo) {
                 this.priceError = true;
             } else {
                 this.priceError = false;
             }
         },
     addSizeToUpdate() {
       this.productSizes.push({ size: "", quantity: "" });
     },
     async fetchSizes() {
       
       try {
         const response = await fetch('http://localhost:3000/addsize');
         if (!response.ok) {
           throw new Error('Failed to fetch sizes');
         }
         const sizes = await response.json();
         this.sizes = sizes;
       } catch (error) {
         console.error(error);
       }
     },
      async fetchCategories() {
        try {
          const response = await fetch('http://localhost:3000/categories');
          if (!response.ok) {
            throw new Error('Không thể tải danh sách loại sản phẩm');
          }
          const data = await response.json();
          // Lặp qua danh sách loại sản phẩm và chỉ lưu trữ trường category
          this.categories = data.map(item => ({ id: item.id, category: item.category }));
        } catch (error) {
          console.error(error);
        }
      },
      searchProducts() {
     // Cập nhật giá trị của các biến trung gian
     this.priceFrom = this.priceFromInput;
     this.priceTo = this.priceToInput;
 
     // Kiểm tra nếu giá bắt đầu lớn hơn giá kết thúc
     if (this.priceFrom !== null && this.priceTo !== null && this.priceFrom >= this.priceTo) {
       this.priceError = true;
       return;
     } else {
       this.priceError = false;
     }
 
     // Lọc theo từ khóa nếu có
     let filteredProducts = this.sanpham;
     if (this.searchKeyword.trim() !== "") {
       const keyword = this.searchKeyword.toLowerCase();
       filteredProducts = filteredProducts.filter(product =>
         product.name.toLowerCase().includes(keyword)
       );
     }
 
     // Lọc theo giá nếu có giá bắt đầu và giá kết thúc được nhập và không có lỗi về giá
     if (this.priceFrom !== null && this.priceTo !== null && !this.priceError) {
       filteredProducts = filteredProducts.filter(product =>
         product.price >= this.priceFrom && product.price <= this.priceTo
       );
     }
 
     // Kiểm tra xem có tìm kiếm nào được nhập không
     if (this.searchKeyword.trim() === "" && (this.priceFrom === null || this.priceTo === null)) {
       // Nếu không có tìm kiếm nào được nhập, đặt giá trị của các trường giá về null
       this.priceFrom = null;
       this.priceTo = null;
     }
 
     this.searchedProducts = filteredProducts;
     this.searched = true;
     this.currentPage = 1;
   },
 
 
 resetFilters() {
   // Đặt lại giá trị của các biến giá về null
   this.priceFrom = null;
   this.priceTo = null;
 },
 
      firstPage() {
        this.currentPage = 1;
      },
      lastPage() {
        this.currentPage = this.pageCount;
      },
      prev() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
      next() {
        if (this.currentPage < this.pageCount) {
          this.currentPage++;
        }
      },
      goToPage(pageNumber) {
        this.currentPage = pageNumber;
      },
  
      getImageUrl(imagePath) {
        // Trả về đường dẫn đến hình ảnh
        return require("@/assets" + imagePath);
      },
 
      async fetchData() {
        try {
          const response = await fetch("http://localhost:3000/sanpham");
          if (!response.ok) {
            throw new Error("Không thể tải dữ liệu");
          }
          const data = await response.json();
          this.sanpham = data; // Gán dữ liệu từ API cho mảng sanpham trong data của component Vue
        } catch (error) {
          console.error(error);
        }
      },
 
      async Delete(product) {
        try {
          // Hiển thị hộp thoại xác nhận trình duyệt trước khi xóa
          const confirmed = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?');
          if (!confirmed) {
            return; // Không thực hiện xóa nếu người dùng không xác nhận
          }
  
          const response = await fetch(`http://localhost:3000/sanpham/${product.id}`, {
            method: 'DELETE',
          });
  
          if (!response.ok) {
            throw new Error('Xóa sản phẩm không thành công');
          }
  
          // Xóa sản phẩm khỏi mảng sanpham
          const index = this.sanpham.findIndex(item => item.id === product.id);
          this.sanpham.splice(index, 1);
        } catch (error) {
          console.error(error);
        }
      },
 
      Edit(product) {
        this.loaisp = product.category;
        this.productName = product.name;
        this.productDate = product.dateAvailable;
        this.productPrice = product.price;
        this.productSizes = [...product.sizes];
        this.productDescription = product.productDescription;
        this.imageUrl = product.image; 
        this.thumbnailUrls = product.thumbnail.slice();
        this.tempThumbnailUrls = product.thumbnail.slice(); 
        this.productCategory = product.category; 
        this.IsAdd = false;
        this.IsUpdate = true;
        this.modalVisible = true;
        this.productToUpdate = product;
      },
   
 async Update() {
    // Đảm bảo URL hình ảnh có sẵn
    if (!this.imageUrl) {
      console.error('Vui lòng chọn hình ảnh');
      return;
    }
 
    const productToUpdate = this.productToUpdate;
 
    if (!productToUpdate) {
      console.error('Không tìm thấy sản phẩm');
      return;
    }
 
    const updatedProduct = {
      // Kiểm tra nếu imageUrl đã thay đổi, nếu không sử dụng đường dẫn ảnh hiện tại
      image: this.imageUrl === productToUpdate.image ? productToUpdate.image : `/images/${this.imageUrl.name}`,
      name: this.productName,
      dateAvailable: this.productDate,
      price: this.productPrice,
      category: this.productCategory, // Bao gồm danh mục trong đối tượng sản phẩm được cập nhật
      thumbnail: this.thumbnailFiles.length > 0 ? this.thumbnailFiles.map(file => `/images/${file.name}`) : this.tempThumbnailUrls, // Sử dụng ảnh thumbnail trước đó nếu không có sự thay đổi
      productDescription: this.productDescription,
      sizes: this.productSizes
 
     };
 
    try {
      const response = await fetch(`http://localhost:3000/sanpham/${productToUpdate.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProduct)
      });
 
      if (!response.ok) {
        throw new Error('Cập nhật dữ liệu không thành công');
      }
 
      // Đóng modal
      this.closeModal();
 
      // Hiển thị thông báo cập nhật thành công dạng alert
 
      await this.fetchData();
    } catch (error) {
      console.error(error);
    }
 
    this.resetForm();
    alert('Cập nhật dữ liệu thành công!');
 
  },
  
 
 
  async onThumbnailChange(event) {
   const files = event.target.files;
   if (files && files.length > 0) {
     try {
       // Lưu trữ các file thực sự vào mảng thumbnailFiles
       this.thumbnailFiles = Array.from(files);
       // Tạo mảng các URL cho các thumbnail
       this.thumbnailUrls = await Promise.all(this.thumbnailFiles.map(file => this.readFileAsDataURL(file)));
       this.isThumbnailSelected = true; // Đánh dấu là đã chọn ảnh thumbnail
       this.clearError('thumbnailUrls'); // Xóa thông báo lỗi
     } catch (error) {
       console.error('Đã xảy ra lỗi khi đọc ảnh:', error);
     }
   } else {
     console.error('Vui lòng chọn các tệp ảnh');
   }
 },
 
      readFileAsDataURL(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
          reader.readAsDataURL(file);
        });
      },
      async onFileChange(event) {
   const file = event.target.files[0];
   if (file) {
     try {
       // Gán đường dẫn hình ảnh vào thuộc tính imageUrl
       this.imageUrl = file;
       this.clearError('imageUrl'); // Xóa thông báo lỗi
     } catch (error) {
       console.error("Đã xảy ra lỗi khi tạo URL cho hình ảnh:", error);
     }
   } else {
     console.error("Vui lòng chọn hình ảnh");
   }
 },
 
      editOrOpenEditModal(product) {
        this.Edit(product); // Gọi phương thức Edit để cập nhật giá trị của các trường trong form
        this.openEditModal(product); // Gọi phương thức openEditModal để mở modal
      },
      openAddModal() {
        this.modalType = 'add';
        this.resetForm(); // Đặt lại giá trị của các trường trong form khi mở modal thêm mới
        this.modalVisible = true;
      },
      // Phương thức để mở modal và đặt trạng thái cho modal là chỉnh sửa sản phẩm
      openEditModal(product) {
        this.modalType = 'edit';
        this.productName = product.name;
        this.productDate = product.dateAvailable;
        this.productPrice = product.price;
        this.productCategory = product.category;
        this.productDescription = product.productDescription;
        this.imageUrl = product.image;
        this.thumbnailUrls = product.thumbnail.slice();
        this.tempThumbnailUrls = product.thumbnail.slice(); // Gán ảnh thumbnail vào biến tạm thời
        this.modalVisible = true;
        this.productToUpdate = product; // Gán sản phẩm cần cập nhật vào biến productToUpdate
      },
      resetForm() {
        this.productName = "";
        this.productDate = "";
        this.productPrice = "";
        this.productDescription = "";
        this.loaisp = "";
        this.imageUrl = "";
        this.IsAdd = true;
        this.IsUpdate = false;
        this.modalVisible = false;
        this.productToUpdate = null; // Đặt biến productToUpdate về null khi reset form
        this.thumbnailFiles = []; // Reset danh sách các tệp thumbnail đã chọn
        this.isThumbnailSelected = false; // Reset trạng thái đã chọn thumbnail
        this.productSizes = [{ size: "", quantity: "" }];
 
       },
     //  closeModal() {
     //    this.modalVisible = false;
     //  },
     closeModal() {
         const closeButton = document.getElementById('closeButton');
         if (closeButton) {
           closeButton.click();
         }
       },
    }
  };
 </script>
 
   <style scoped>
   .products-container {
     max-width: 1200px;
     margin: 0 auto;
   }
   
   .add-button {
     margin-bottom: 20px;
   }
   
   .table {
     width: 100%;
   }
   
   .pagination {
     margin-top: 20px;
     display: flex;
     justify-content: center;
   }
   
   .modal-content {
     border-radius: 10px;
   }
   
   .modal-body input {
     width: 100%;
   }
   
   .modal-body img {
     margin-top: 10px;
     display: block;
   }
   </style>