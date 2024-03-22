<template lang="">
  <div class="products container">
    <div class="row">
      <div class="col-md-1 mt-3">
        <button
          class="btn btn-primary"
          type="button"
          data-toggle="modal"
          data-target="#modelId"
        >
          Thêm mới
        </button>
      </div>
      <div class="col-md-11">
        <table class="table table-bordered table-sm">
          <thead>
            <tr>
              <th>STT</th>
              <th>Image</th>
              <th>Tên sp</th>
              <th>Ngày</th>
              <th>Giá</th>
              <th>Mô tả</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in sanpham" :key="index">
              <td>{{ index + 1 }}</td>
              <td scope="row">
                <img :src="getImageUrl(product.image)" width="50px" alt="" />
              </td>

              <td>{{ product.name }}</td>
              <td>{{ product.dateAvailable }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.productDescription }}</td>
              <td>
                <button
                  class="btn btn-primary"
                  @click="Edit(product)"
                  data-toggle="modal"
                  data-target="#modelId"
                >
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

    <!-- Modal -->
    <div
      class="modal fade"
      id="modelId"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
      :class="{ show: modalVisible }"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ IsAdd ? "Thêm mới sản phẩm" : "Chỉnh sửa sản phẩm" }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="closeModal"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="">Tên sản phẩm</label>
                    <input
                      type="text"
                      v-model="productName"
                      class="form-control"
                      placeholder="Nhập tên sản phẩm"
                      aria-describedby="helpId"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="">Ngày</label>
                    <input
                      type="date"
                      v-model="productDate"
                      class="form-control"
                      placeholder="Chọn ngày"
                      aria-describedby="helpId"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="">Giá</label>
                    <input
                      type="number"
                      v-model="productPrice"
                      class="form-control"
                      placeholder="Nhập giá"
                      aria-describedby="helpId"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="">Mô tả</label>
                    <input
                      type="text"
                      v-model="productDescription"
                      class="form-control"
                      placeholder="Nhập mô tả"
                      aria-describedby="helpId"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="">Ảnh</label>
                    <input
                      type="file"
                      @change="onFileChange"
                      class="form-control-file"
                      aria-describedby="fileHelpId"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <img :src="imageUrl" width="100px" alt="" />
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              v-if="IsAdd"
              @click="Add()"
            >
              Thêm mới
            </button>
            <button
              type="button"
              class="btn btn-primary"
              v-if="IsUpdate"
              @click="Update()"
            >
              Cập nhật
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click="resetForm()"
            >
              Đóng
            </button>
          </div>
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
      sanpham: [],
      productName: "",
      productDate: "",
      productPrice: "",
      productDescription: "",
      imageUrl: "",
      IsAdd: true,
      IsUpdate: false,
      modalVisible: false,
    };
  },
  mounted() {
    this.fetchData(); // Gọi phương thức fetchData khi component được tạo
  },
  methods: {
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
    Edit(product) {
      this.productName = product.name;
      this.productDate = product.dateAvailable;
      this.productPrice = product.price;
      this.productDescription = product.productDescription;
      this.imageUrl = product.image; // Gán đường dẫn hình ảnh từ sản phẩm vào imageUrl
      this.IsAdd = false;
      this.IsUpdate = true;
      this.modalVisible = true;
      this.productToUpdate = product;
    },

    async Delete(index) {
      if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
        try {
          const response = await fetch(
            `http://localhost:3000/sanpham/${this.sanpham[index].id}`,
            {
              method: "DELETE",
            }
          );

          if (!response.ok) {
            throw new Error("Không thể xóa sản phẩm");
          }

          // Xóa sản phẩm khỏi mảng sanpham
          this.sanpham.splice(index, 1);
        } catch (error) {
          console.error(error);
        }
      }
    },
    async Update() {
      // Ensure that the image URL is available
      if (!this.imageUrl) {
        console.error("Vui lòng chọn hình ảnh");
        return;
      }

      const productToUpdate = this.productToUpdate;

      if (!productToUpdate) {
        console.error("Không tìm thấy sản phẩm");
        return;
      }

      const updatedProduct = {
        // Check if imageUrl has changed, if not use the current image path
        image:
          this.imageUrl === productToUpdate.image
            ? productToUpdate.image
            : `/images/${this.imageUrl.name}`,
        name: this.productName,
        dateAvailable: this.productDate,
        price: this.productPrice,
        productDescription: this.productDescription,
      };

      try {
        const response = await fetch(
          `http://localhost:3000/sanpham/${productToUpdate.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
          }
        );

        if (!response.ok) {
          throw new Error("Cập nhật dữ liệu không thành công");
        }
        await this.fetchData();
      } catch (error) {
        console.error(error);
      }

      this.resetForm();
      this.closeModal();
    },

    async Add() {
      if (!this.imageUrl) {
        console.error("Vui lòng chọn hình ảnh");
        return;
      }

      // Tạo mới sản phẩm với đường dẫn hình ảnh từ this.imageUrl
      const newProduct = {
        image: `/images/${this.imageUrl.name}`, // Sử dụng tên file hình ảnh
        name: this.productName,
        dateAvailable: this.productDate,
        price: this.productPrice,
        productDescription: this.productDescription,
      };

      try {
        // Gửi yêu cầu POST đến API endpoint để thêm mới sản phẩm
        const response = await fetch("http://localhost:3000/sanpham", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
        });

        if (!response.ok) {
          throw new Error("Không thể thêm mới sản phẩm");
        }

        // Sau khi thêm mới thành công, cập nhật lại danh sách sản phẩm bằng cách gọi lại phương thức fetchData()
        await this.fetchData();
      } catch (error) {
        console.error(error);
      }

      this.resetForm();
      this.closeModal();
    },

    async onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        try {
          // Gán đường dẫn hình ảnh vào thuộc tính imageUrl
          this.imageUrl = file;
        } catch (error) {
          console.error("Đã xảy ra lỗi khi tạo URL cho hình ảnh:", error);
        }
      } else {
        console.error("Vui lòng chọn hình ảnh");
      }
    },
    resetForm() {
      this.productName = "";
      this.productDate = "";
      this.productPrice = "";
      this.productDescription = "";
      this.imageUrl = "";
      this.IsAdd = true;
      this.IsUpdate = false;
      this.modalVisible = false;
    },
    closeModal() {
      this.modalVisible = false;
    },
  },
};
</script>
<style lang=""></style>
