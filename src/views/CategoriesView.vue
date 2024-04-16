<template>
  <div class="categories container">
  <div class="row">
    <div class="col-md-12">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h3 class="mb-0">Danh mục sản phẩm</h3>
        <button class="btn btn-primary" type="button" data-toggle="modal" data-target="#modelId">Thêm mới</button>
      </div>
      <table class="table table-bordered table-sm">
        <thead class="thead-dark">
          <tr>
            <th>STT</th>
            <th>Tên danh mục</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(category, index) in categories" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ category.category }}</td>
            <td>
              <button class="btn btn-primary mr-2" @click="Edit(category)" data-toggle="modal" data-target="#modelId">Sửa</button>
              <button class="btn btn-danger" @click="Delete(index)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
  <!-- Modal -->
  <div class="modal fade" id="modelId" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true" :class="{ show: modalVisible }">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{ IsAdd ? "Thêm mới danh mục" : "Cập nhật danh mục" }}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
  <form>
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label for="CataName">Tên danh mục</label>
          <input type="text" v-model="CataName" class="form-control" id="CataName" placeholder="Nhập tên danh mục" aria-describedby="helpId" />
          <small class="text-danger">{{ errorMessage.CataName }}</small>
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <label for="menuCataName">Loại Menu</label>
          <select class="form-select form-control" v-model="menuCataName" id="menuCataName">
            <option v-for="menu in menus" :key="menu.id" :value="menu.menuType">{{ menu.menuType }}</option>
          </select>
          <small class="text-danger">{{ errorMessage.menuCataName }}</small>
        </div>
      </div>
    </div>
  </form>
</div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" v-if="IsAdd" @click="Add()">Thêm mới</button>
        <button type="button" class="btn btn-primary" v-if="IsUpdate" @click="Update()">Cập nhật</button>
        <button id="closeButton" type="button" class="btn btn-secondary" data-dismiss="modal" @click="resetForm()">Đóng</button>
      </div>
    </div>
  </div>
</div>

</template>
<script>
export default {
  name: "CategoriesView",
  data() {
    return {
  categories: [],
  IsAdd: true,
  IsUpdate: false,
  modalVisible: false,
  CataName: "",
  menuCataName: "",
  selectedCategoryIndex: null,
  menus: [],
  errorMessage: {
    CataName: "",
    menuCataName: "",
  },
};

  },

  mounted() {
    this.fetchData();
  },
  methods: {

    async fetchData() {
      try {
        const [categoriesResponse, menusResponse] = await Promise.all([
          fetch("http://localhost:3000/categories"),
          fetch("http://localhost:3000/menus"),
        ]);

        if (!categoriesResponse.ok || !menusResponse.ok) {
          throw new Error("Không thể tải dữ liệu");
        }

        const [categoriesData, menusData] = await Promise.all([
          categoriesResponse.json(),
          menusResponse.json(),
        ]);

        this.categories = categoriesData;
        this.menus = menusData;
      } catch (error) {
        console.error(error);
      }
    },
    resetForm() {
      this.CataName = "";
      this.menuCataName = "";
      this.IsAdd = true;
      this.IsUpdate = false;
      this.modalVisible = false;
      this.selectedCategoryIndex = null;
    },
    closeModal() {
      const closeButton = document.getElementById('closeButton');
      if (closeButton) {
        closeButton.click();
      }
    },
    
    Add() {
  // Reset errorMessage
  this.errorMessage = {
    CataName: "",
    menuCataName: "",
    common: "" // Thêm thông báo chung
  };

  // Kiểm tra xem các trường có được điền hay không
  if (!this.CataName) {
    // Nếu trường "Tên danh mục" không được điền, đặt thông báo lỗi tương ứng
    this.errorMessage.CataName = 'Vui lòng nhập tên danh mục';
  }
  if (!this.menuCataName) {
    // Nếu trường "Loại Menu" không được chọn, đặt thông báo lỗi tương ứng
    this.errorMessage.menuCataName = 'Vui lòng chọn loại menu';
  }

  // Nếu không có lỗi, thực hiện thêm mới danh mục
  if (this.CataName && this.menuCataName) {
    const newCategory = {
      category: this.CataName,
      menuType: this.menuCataName,
    };

    fetch("http://localhost:3000/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCategory),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Không thể thêm danh mục mới.");
        }
        return response.json();
      })
      .then((data) => {
        this.categories.push(data);
        this.resetForm();
        this.closeModal();
        // Hiển thị thông báo "Thêm sản phẩm thành công" bằng alert
        alert("Thêm sản phẩm thành công");
      })
      .catch((error) => {
        console.error(error);
        // Nếu có lỗi từ server, hiển thị thông báo lỗi
        this.errorMessage.common = "Đã xảy ra lỗi khi thêm danh mục mới.";
      });
  }
},


    Edit(category) {
      this.CataName = category.category;
      this.menuCataName = category.menuType;
      this.categoryToUpdate = category;
      this.IsAdd = false;
      this.IsUpdate = true;
      this.modalVisible = true;
    },
    async Update() {
  const categoryToUpdate =  this.categoryToUpdate;
  if(!categoryToUpdate){
    console.log("Không tìm thấy danh mục");
    return
  }
  
  const updatedCategory = {
    category: this.CataName,
    menuType: this.menuCataName,
  };

  try {
    const response = await fetch(
      `http://localhost:3000/categories/${categoryToUpdate.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCategory),
      }
    );
    if (!response.ok) {
      throw new Error("Cập nhật dữ liệu không thành công");
    }
    await this.fetchData();
    this.closeModal();
    // Hiển thị thông báo "Cập nhật dữ liệu thành công" bằng alert
    alert("Cập nhật dữ liệu thành công");
  } catch (error) {
    console.error(error);
  }
},


    async Delete(index) {
      if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
        try {
          const response = await fetch(
            `http://localhost:3000/categories/${this.categories[index].id}`,
            {
              method: "DELETE",
            }
          );

          if (!response.ok) {
            throw new Error("Không thể xóa sản phẩm");
          }

          this.categories.splice(index, 1);
        } catch (error) {
          console.error(error);
        }
      }
    },
  },
  watch: {
    categories: {
      handler(newVal) {
        // Xử lý khi categories thay đổi
        console.log('Categories đã thay đổi:', newVal);
      },
      deep: true // Theo dõi sâu các phần tử của mảng categories
    }
  }
};
</script>

<style scoped></style>
