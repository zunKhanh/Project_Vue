<template>
  <div class="categories container">
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
              <th>Tên danh mục</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(category, index) in categories" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ category.category }}</td>
              <td>
                <button
                  class="btn btn-primary"
                  @click="Edit(category)"
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
            {{ IsAdd ? "Thêm mới danh mục" : "Cập nhật danh mục" }}
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
                  <label for="">Tên danh mục</label>
                  <input
                    type="text"
                    v-model="CataName"
                    class="form-control"
                    placeholder="Nhập tên danh mục"
                    aria-describedby="helpId"
                  />
                </div>
              </div>
              <div class="mb-3">
                  <label for="" class="form-label">Loại Menu</label>
                  <select
                    class="form-select form-select-lg"
                    name=""
                    id=""
                    v-model="menuCataName"
                  >
                    <option v-for="menu in menus" :key="menu.id" :value="menu.menuType">{{ menu.menuType }}</option>
                   
                  </select>
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
          id="closeButton"
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
          })
          .catch((error) => {
            console.error(error);
            alert("Đã xảy ra lỗi khi thêm danh mục mới.");
          });
      } else {
        alert("Vui lòng nhập tên danh mục và loại menu.");
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
