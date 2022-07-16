<template>
  <div>

    <div v-if="!isLoading">
      <!-- Update forum modal -->
      <div class="modal" id="forumModal" v-if="forum.author_uid == userId">
        <div class="modal-box">
          <h3 class="font-bold text-lg text-center">Update Forum Modal</h3>
          <form @submit.prevent="updateForum">
            <div class="flex flex-col">
              <label for="title">Judul Forum</label>
              <input 
                type="text" 
                placeholder="Judul Forum" 
                class="input input-bordered w-full"
                v-model="formForum.title"
              >
            </div>
            <div class="flex flex-col">
              <label for="content">Konten Forum</label>
              <textarea 
                placeholder="Menurut saya anime ini..." 
                class="textarea textarea-bordered"
                v-model="formForum.content">
              </textarea>
            </div>
            <div class="modal-action">
            <a href="#" class="btn btn-outline" ref="btnCloseForumModal">Tutup</a>
            <button 
            type="submit"
            class="
              btn btn-primary 
              bg-orange-400 
              border-orange-400 
              hover:bg-orange-500 
              hover:border-orange-500">
              Simpan
            </button>
            </div>
          </form>
        </div>
      </div>
      <!-- End Modal -->
    </div>

    <div class="px-32">
      <div class="mt-5 card w-full bg-base-100 card-compact shadow-xl p-5">
        <div class="card-body text-center space-y-2">
          <div v-if="isLoading">Loading...</div>
          <div v-else>
            <h1 class="font-bold text-2xl">{{ forum.title }}</h1>
            <p class="font-normal text-lg">Author: {{ forum.author}} - {{ forum.created_at}}</p>
            <div class="space-x-3 my-2" v-if="forum.author_uid === userId">
              <a href="#forumModal" class="btn btn-warning btn-xs text-white">
                Edit
              </a>
              <button class="btn btn-error btn-xs text-white" @click="deleteForum">
                Delete
              </button>
            </div>
            <p class="font-medium text-lg font-sans">{{ forum.content }}</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { getAuth } from '@firebase/auth';
import { getFirestore, doc, getDoc, deleteDoc, updateDoc, Timestamp } from '@firebase/firestore';
export default {
  name: 'ForumDetail',
  data() {
    return {
      userId: '',
      isLoading: true,
      forum: {},
      formForum: {
        title: '',
        content: ''
      }
    }
  },
  created() {
    this.getForum();
  },
  methods: {
    getForum() {
      const forumId = this.$route.params.id;
      const db = getFirestore(this.$firebase);
      const documentRef = doc(db, 'forums', forumId);
      getDoc(documentRef)
        .then((document) => {
          const { seconds, nanoseconds } = document.data().created_at;
          const date = new Timestamp(seconds, nanoseconds).toDate().toLocaleDateString();

          this.forum = {
            ...document.data(),
            id: document.id,
            created_at: date
          }
          this.userId = getAuth().currentUser.uid;

          if (this.userId == this.forum.author_uid) {
            this.formForum.title = this.forum.title;
            this.formForum.content = this.forum.content;
          }

          console.log(this.forum);
        })
        .catch((error) => {
          alert(error.message);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    updateForum() {
      const db = getFirestore(this.$firebase);
      const documentUpdateRef = doc(db, 'forums', this.forum.id);
      updateDoc(documentUpdateRef, {
        title: this.formForum.title,
        content: this.formForum.content
      })
      .then(() => {
        this.getForum();
        this.$refs.btnCloseForumModal.click();
      })
      .catch((error) => {
        alert(error.message);
      })
    },
    deleteForum() {
      const isConfirmDelete = confirm('Hapus forum ini?');
      if (isConfirmDelete) {
        const db = getFirestore(this.$firebase);
        const documentDeleteRef = doc(db, 'forums', this.forum.id);
        deleteDoc(documentDeleteRef)
          .then(() => {
            this.$router.push({ path: '/forum' });
          })
          .catch((error) => {
            alert(error.message);
          })

      }
    }
  }
}
</script>