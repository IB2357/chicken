<template>
  <SideBar :quizzes="quizzes" :topics="topics" @quiz-selected="selectQuiz" @topic-selected="selectTopic" />

  <div class="lg:ps-[260px] ">
    <div class="min-h-[75rem] p-4 md:p-8">

      <!-- header -->

      <NavBar :selectedQuiz="selectedQuiz" @quiz-create="createQuiz" @topic-create="createTopic"
        @handle-sign-out="handleSignOut" />

      <h1 class="mt-10 text-3xl font-bold  text-gray-400 sm:text-4xl">
        <button @click="refreshState(false)" type="button"
          class="mr-8 py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999">
            <path
              d="M440-520h80v-280q0-17-11.5-28.5T480-840q-17 0-28.5 11.5T440-800v280ZM200-360h560v-80H200v80Zm-58 240h98v-80q0-17 11.5-28.5T280-240q17 0 28.5 11.5T320-200v80h120v-80q0-17 11.5-28.5T480-240q17 0 28.5 11.5T520-200v80h120v-80q0-17 11.5-28.5T680-240q17 0 28.5 11.5T720-200v80h98l-40-160H182l-40 160Zm676 80H142q-39 0-63-31t-14-69l55-220v-80q0-33 23.5-56.5T200-520h160v-280q0-50 35-85t85-35q50 0 85 35t35 85v280h160q33 0 56.5 23.5T840-440v80l55 220q13 38-11.5 69T818-40Zm-58-400H200h560Zm-240-80h-80 80Z" />
          </svg>
        </button>
        <span class="text-gray-500 mr-2 ">Hello </span>
        {{ currentUser.displayName || currentUser.email }}
        <svg class=" mx-3 mb-2 inline-flex " fill="#bbb" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink" height="35px" width="35px"  viewBox="0 0 103.695 103.695"
          xml:space="preserve">
          <g>
            <path
              d="M32.441,35.827c0-1.025,0.365-2.114,1.002-2.988c0.729-1,1.684-1.551,2.691-1.551c1,0,1.942,0.437,2.625,1.173   c0.684-0.736,1.626-1.173,2.626-1.173c1.006,0,1.961,0.551,2.688,1.551c0.637,0.874,1.002,1.963,1.002,2.988   c0,1.628-1.006,3.473-2.991,5.485c-1.414,1.434-2.812,2.425-2.87,2.466c-0.137,0.097-0.296,0.145-0.455,0.145   c-0.156,0-0.313-0.046-0.446-0.138C38.073,43.62,32.441,39.717,32.441,35.827z M52.408,77.516c10.085,0,19.085-5.742,22.928-14.629   c0.657-1.521-0.042-3.287-1.562-3.943c-1.521-0.66-3.286,0.042-3.944,1.562c-2.894,6.689-9.729,11.012-17.421,11.012   c-7.868,0-14.747-4.319-17.523-11.004c-0.479-1.154-1.596-1.851-2.771-1.851c-0.384,0-0.773,0.074-1.149,0.229   c-1.531,0.637-2.256,2.393-1.62,3.922C33.053,71.745,42.107,77.516,52.408,77.516z M66.432,43.785   c0.135,0.092,0.291,0.138,0.446,0.138c0.159,0,0.318-0.048,0.455-0.145c0.06-0.041,1.456-1.032,2.87-2.466   c1.984-2.013,2.991-3.857,2.991-5.485c0-1.024-0.365-2.114-1.002-2.988c-0.728-1-1.683-1.551-2.688-1.551   c-1,0-1.941,0.437-2.626,1.173c-0.683-0.736-1.625-1.173-2.625-1.173c-1.008,0-1.963,0.551-2.69,1.551   c-0.637,0.874-1.002,1.963-1.002,2.988C60.561,39.717,66.192,43.62,66.432,43.785z M103.695,85.467V18.23   C103.695,8.178,95.518,0,85.465,0H18.23C8.177,0,0,8.178,0,18.23v67.235c0,10.053,8.178,18.23,18.23,18.23h67.235   C95.518,103.696,103.695,95.518,103.695,85.467z M85.465,8.579c5.321,0,9.651,4.33,9.651,9.651v67.235   c0,5.321-4.33,9.651-9.651,9.651H18.23c-5.322,0-9.652-4.33-9.652-9.651V18.23c0-5.321,4.33-9.651,9.652-9.651H85.465z" />
          </g>
        </svg>

      </h1>


      <div id="scrollspy" class="space-y-10 md:space-y-16">

        <!-- contents -->

        <QuizDetails v-if="selectedQuiz" :quiz="selectedQuiz" :topics="topics" @delete-quiz="deleteQuiz"
          @quiz-updated="refreshState" @quiz-deleted="refreshState" />
        <TopicDetails v-else-if="selectedTopic" :topic="selectedTopic" @topic-updated="refreshState"
          @delete-quiz="deleteQuiz" @delete-topic="deleteTopic" />

        <div v-else class="flex items-center justify-center h-screen font-bold text-xl  text-gray-400">
          <p class="text-center">Please select a Quiz or Topic to view details.</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, signOut } from 'firebase/auth'
import { db } from "../firebase";
import { collection, getDocs, doc, deleteDoc, updateDoc, arrayRemove, query, where } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

import NavBar from '@/components/NavBar.vue';
import SideBar from '@/components/SideBar.vue';
import QuizDetails from '@/components/QuizDetails.vue';
import TopicDetails from '@/components/TopicDetails.vue';

const auth = getAuth();
export default {
  data() {
    return {
      currentUser: auth.currentUser,
      selectedQuiz: null,
      selectedTopic: null,
      quizzes: [],
      topics: [],
    };
  },
  methods: {
    async fetchQuizzes() {
      const querySnapshot = await getDocs(collection(db, "quizzes"));
      this.quizzes = querySnapshot.docs.map(doc => doc.data());
      this.loadingQuizzes = false;
    },
    async fetchTopics() {
      const querySnapshot = await getDocs(collection(db, "topics"));
      this.topics = querySnapshot.docs.map(doc => doc.data());
      this.loadingTopics = false;
    },
    selectQuiz(quiz) {
      this.selectedQuiz = quiz;
      this.selectedTopic = null;
    },
    createQuiz() {
      this.refreshState();
      this.selectedQuiz = {
        id: uuidv4(),
        title: '',
        description: '',
        topic: '',
        questions: []
      };
    },
    async deleteQuiz(quiz) {
      if (quiz) {
        // from quizzes collection
        const quizDoc = doc(db, "quizzes", quiz.id);
        await deleteDoc(quizDoc);

        //  from topics collection
        const topicDoc = doc(db, "topics", quiz.topic);
        await updateDoc(topicDoc, {
          quizzes: arrayRemove({
            id: quiz.id,
            title: quiz.title
          })
        });
        this.refreshState(true);
      }
    },
    selectTopic(topic) {
      this.selectedQuiz = null;
      this.selectedTopic = topic;
    },
    createTopic() {
      this.refreshState();
      this.selectedTopic = {
        id: uuidv4(),
        title: '',
        img: '',
        quizzes: []
      };
    },
    async deleteTopic(topic) {
      try {
        // delete the topic's quizzes
        const quizzesQuery = query(
          collection(db, "quizzes"),
          where("topic", "==", topic.id)
        );
        const querySnapshot = await getDocs(quizzesQuery);
        const deleteQuizPromises = querySnapshot.docs.map((docSnapshot) => deleteDoc(docSnapshot.ref));
        await Promise.all(deleteQuizPromises);

        // delete the topic itself
        const topicDoc = doc(db, "topics", topic.id);
        await deleteDoc(topicDoc);

        alert("Topic and all associated quizzes removed successfully!");
        this.refreshState();


      } catch (error) {
        console.error("Error deleting topic and quizzes:", error);
        alert("There was an error deleting the topic.");
      }
    },
    refreshState(partly = false) {
      if (!partly) {
        this.selectedQuiz = null;
        this.selectedTopic = null;
        console.log('refreshing state')
      } else {
        console.log('partly refreshing state')
      }
      this.fetchQuizzes();
      this.fetchTopics();
    },
    handleSignOut() {
      signOut(auth).then(() => {
        this.$router.push('/sign-in');
        console.log('Signed Out! '); // Debugging log
      }).catch((error) => {
        console.error('Error during sign out:', error);
      });
    },
  },
  mounted() {
    this.fetchQuizzes();
    this.fetchTopics();
  },
  components: {
    NavBar,
    SideBar,
    QuizDetails,
    TopicDetails,
  }
};
</script>
