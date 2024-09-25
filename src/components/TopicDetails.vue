<template>
    <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div class="max-w-xl mx-auto">
            <div class="text-center">
                <h2 class="text-3xl font-bold text-gray-800 sm:text-4xl">
                    <span class="text-gray-400">Edit Topic: </span>
                    {{ topicCopy.title }}
                </h2>
            </div>

            <div class="border-b-2 border-gray-200">
                <nav class="-mb-0.5 flex gap-x-6">
                    <a @click="this.tap = 0"
                        class="py-4 px-1 inline-flex items-center gap-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-[#9575CD] focus:outline-none focus:text-[#9575CD] active"
                        href="#" aria-current="page">
                        info
                    </a>
                    <a @click="this.tap = 1"
                        class="py-4 px-1 inline-flex items-center gap-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-[#9575CD] focus:outline-none focus:text-[#9575CD]"
                        href="#">
                        Cover
                    </a>
                    <a @click="this.tap = 2"
                        class="py-4 px-1 inline-flex items-center gap-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-[#9575CD] focus:outline-none focus:text-[#9575CD]"
                        href="#">
                        Quizzes
                    </a>
                </nav>
            </div>

            <div class="mt-12">
                <!-- Form -->
                <form v-if="tap == 0" @submit.prevent="saveTopic">
                    <div class="grid gap-4 lg:gap-6">

                        <!-- Title -->
                        <div>
                            <label for="title" class="block mb-2 text-sm text-gray-700 font-medium">Title</label>
                            <input v-model="topicCopy.title" id="title" type="text"
                                class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
                        </div>

                        <!-- Image -->
                        <div>
                            <label for="img" class="block mb-2 text-sm text-gray-700 font-medium">Image Name</label>
                            <input disabled v-model="topicCopy.img" id="img" type="text"
                                class="py-3 px-4 block w-full bg-gray-200 border-gray-200 rounded-lg text-sm ">
                        </div>


                    </div>
                    <!-- End Grid -->

                    <!-- buttons -->
                    <div class="mt-4 grid">
                        <hr class="border mb-4">
                        <!-- Save Button -->
                        <button type="submit" :disabled="noEdits"
                            class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-[#B39DDB] text-white hover:bg-[#9575CD] focus:outline-none focus:bg-[#9575CD] disabled:opacity-50 disabled:pointer-events-none">
                            Save Topic
                        </button>
                    </div>
                </form>
                <!-- End Form -->
                <div v-if="tap == 1">
                    <ImageUpload v-if="this.topicCopy.title" @imgUploaded="saveUploadedImg" />
                    <p v-else class="text-center">You have to choose a topic first </p>
                </div>

                <!-- Quizzes -->
                <div v-if="tap == 2" class="mt-8">
                    <p class="block mt-2 mb-2 text-lg text-gray-700 font-medium">Quizzes:</p>
                    <hr class="border-2">
                    <div class="flex flex-col">
                        <div class="-m-1.5 overflow-x-auto">
                            <div class="p-1.5 min-w-full inline-block align-middle">
                                <div class="overflow-hidden">
                                    <table class="min-w-full divide-y divide-gray-200">
                                        <thead>
                                            <tr>
                                                <th scope="col"
                                                    class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                                                    quiz No.</th>
                                                <th scope="col"
                                                    class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                                                    Title</th>
                                                <th scope="col"
                                                    class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">
                                                    Action</th>
                                            </tr>
                                        </thead>
                                        <tbody class="divide-y divide-gray-200">
                                            <tr v-for="(quiz, index) in topicCopy.quizzes" :key="index"
                                                class="hover:bg-gray-100">
                                                <td
                                                    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                                    {{ index + 1 }}</td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                                    {{ quiz.title }}</td>
                                                <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                    <button @click="removeQuiz(index)" type="button"
                                                        class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-400 hover:text-red-600 focus:outline-none focus:text-red-800 disabled:opacity-50 disabled:pointer-events-none">
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
                </div>


            </div>
            <!-- delete Button -->
            <button @click="deleteTopic"
                class="mt-4 w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-[#D16D6A] text-white hover:bg-[#BB271A] focus:outline-none focus:bg-[#BB271A] disabled:opacity-50 disabled:pointer-events-none">
                Delete Topic
            </button>
        </div>
    </div>

</template>

<script>
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import ImageUpload from './imageUpload.vue';

export default {
    props: {
        topic: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            topicCopy: JSON.parse(JSON.stringify(this.topic)),  // Create a local copy
            tap: 0,
        };
    },
    methods: {
        async saveTopic() {
            try {
                if (this.topicCopy.title) { // title is required
                    const topicDoc = doc(db, "topics", this.topicCopy.id);

                    // setDoc with merge to either add or update the topic
                    await setDoc(topicDoc, this.topicCopy, { merge: true });
                    this.$emit('topic-updated', true);
                }
                else {
                    alert('Topic Title is required!')
                }
            } catch (error) {
                console.error("Error saving topic:", error);
                alert("There was an error saving the topic.");
            }
        },
        saveUploadedImg(fileName) {
            this.topicCopy.img = fileName;
            this.saveTopic();
        },
        removeQuiz(index) {
            this.topicCopy.quizzes.splice(index, 1);
            const quizToRemove = { ... this.topic.quizzes[index], "topic": this.topic.id };
            this.$emit("delete-quiz", quizToRemove);
            // this.$emit('quiz-updated',true); 
        },
        async deleteTopic() {
            if (this.topic) {
                this.$emit("delete-topic", this.topic);
            }
        },
    },
    computed: {
        noEdits() {
            return JSON.stringify(this.topic) === JSON.stringify(this.topicCopy)
        }
    },
    components: {
        ImageUpload
    },
    watch: {
        topic: {
            handler(newTopic) {
                // Update local copy if prop changes
                this.topicCopy = JSON.parse(JSON.stringify(newTopic));
            },
            deep: true
        }
    }
};

</script>
