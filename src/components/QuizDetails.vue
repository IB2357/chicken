<template>
    <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div class="max-w-xl mx-auto">
            <div class="text-center">
                <h2 class="text-3xl font-bold text-gray-800 sm:text-4xl">
                    <span class="text-gray-400">Edit Quiz: </span>
                    {{ quizCopy.title }}
                </h2>
            </div>

            <div class="mt-12">
                <!-- Form -->
                <form @submit.prevent="saveQuiz">
                    <div class="grid gap-4 lg:gap-6">

                        <!-- title -->
                        <div>
                            <label for="title" class="block mb-2 text-sm text-gray-700 font-medium">Title</label>
                            <input v-model="quizCopy.title" id="title" type="text"
                                class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
                        </div>

                        <!-- topic -->
                        <div>
                            <label for="topic" class="block mb-2 text-sm text-gray-700 font-medium">Topic</label>
                            <select v-model="quizCopy.topic" id="topic"
                                class="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
                                <option v-for="topic in topics" :key="topic.id" :value="topic.id"> {{ topic.title }}
                                </option>
                            </select>
                        </div>

                        <!-- description -->
                        <div>
                            <label for="description"
                                class="block mb-2 text-sm text-gray-700 font-medium">Description</label>
                            <textarea v-model="quizCopy.description" id="description" name="description" rows="3"
                                class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"></textarea>
                        </div>

                        <!-- questions -->
                        <div>
                            <p class="block mt-2 mb-2 text-lg text-gray-700 font-medium">. Questions:</p>
                            <div class="border-2 p-3">

                                <!-- question -->
                                <div v-for="(question, index) in quizCopy.questions" :key="index">

                                    <p
                                        class="mt-8 text-gray-600 dark:text-neutral-400 text-center flex items-center justify-center gap-2">
                                        Question {{ index + 1 }}
                                        <button @click="removeQuestion(index)" type="button"
                                            class=" inline-flex items-center gap-x-2 rounded-lg border border-transparent ">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px"
                                                viewBox="0 -960 960 960" width="24px" fill="#999999">
                                                <path
                                                    d="m456-320 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 160q-19 0-36-8.5T296-192L80-480l216-288q11-15 28-23.5t36-8.5h440q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H360ZM180-480l180 240h440v-480H360L180-480Zm400 0Z" />
                                            </svg>
                                        </button>
                                    </p>

                                    <label class="block mb-2 text-sm text-gray-700 font-medium">Question Text</label>
                                    <textarea v-model="question.text" rows="1"
                                        class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
                                </textarea>
                                    <!-- options -->
                                    <p class="pt-4 block mb-2 text-sm text-gray-700 font-medium">Options</p>
                                    <div v-for="(option, i) in question.options" :key="i" class="mt-3">
                                        <!-- Flex container to align input and checkbox -->
                                        <div class="flex items-center justify-between">
                                            <!-- Input field -->
                                            <input v-model="option.value" type="text"
                                                class="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" />

                                            <!-- Checkbox label -->
                                            <label :for="'option' + i"
                                                class="ml-3 flex items-center bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 w-auto p-2">
                                                <input v-model="option.correct" type="checkbox"
                                                    class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                                    :id="'option' + i">
                                                <span class="text-sm text-gray-500 ms-3">Correct</span>
                                            </label>
                                        </div>
                                    </div>
                                    <!-- <hr class="my-2 border-2"> -->
                                </div>
                                <!-- Add Question Button -->
                                <button @click.prevent="addQuestion"
                                    class="w-full py-3 px-4 mt-8 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-purple-200 bg-white/20 backdrop-blur-md text-purple-500 hover:bg-gray-200  focus:outline-none focus:bg-gray-300 focus:text-white disabled:opacity-50 disabled:pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                        width="24px" fill="#999999">
                                        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- End Grid -->

                    <div class="mt-4 grid">
                        <!-- Save Button -->
                        <button :disabled="noEdits" type="submit"
                            class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-[#B39DDB] text-white hover:bg-[#9575CD] focus:outline-none focus:bg-[#9575CD] disabled:opacity-50 disabled:pointer-events-none">
                            Save
                        </button>
                    </div>
                </form>
                <!-- End Form -->

                <!-- delete Button -->
                <button @click="deleteQuiz"
                    class="mt-4 w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-[#D16D6A] text-white hover:bg-[#BB271A] focus:outline-none focus:bg-[#BB271A] disabled:opacity-50 disabled:pointer-events-none">
                    Delete Quiz
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { doc, setDoc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";

export default {
    props: {
        quiz: {
            type: Object,
            required: true
        },
        topics: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            quizCopy: JSON.parse(JSON.stringify(this.quiz))  // Create a local copy
        };
    },
    methods: {
        async saveQuiz() {
            try {
                const quizDoc = doc(db, "quizzes", this.quizCopy.id);

                const oldTopicId = this.quiz.topic;
                const newTopicId = this.quizCopy.topic;

                if (oldTopicId) {
                    const oldTopicDoc = doc(db, "topics", oldTopicId);
                    await updateDoc(oldTopicDoc, {
                        quizzes: arrayRemove({
                            id: this.quiz.id,
                            title: this.quiz.title,
                        })
                    });
                }

                if (newTopicId) {
                    const newTopicDoc = doc(db, "topics", newTopicId);
                    await updateDoc(newTopicDoc, {
                        quizzes: arrayUnion({
                            id: this.quizCopy.id,
                            title: this.quizCopy.title,
                        })
                    });
                }

                await setDoc(quizDoc, this.quizCopy, { merge: true });
                this.$emit('quiz-updated');  // Emit an event to the parent

            } catch (error) {
                console.error("Error saving quiz:", error);
                alert("There was an error saving the quiz.");
            }
        },
        async deleteQuiz() {
            if (this.quiz) {
                this.$emit("delete-quiz", this.quiz);
                this.$emit('quiz-updated');

            }
        },
        addQuestion() {
            this.quizCopy.questions.push({
                text: '',
                options: [
                    { value: '', correct: false },
                    { value: '', correct: false },
                    { value: '', correct: false },
                ]
            });
        },
        removeQuestion(index) {
            this.quizCopy.questions.splice(index, 1);
        }
    },
    computed: {
        noEdits() {
            return JSON.stringify(this.quiz) === JSON.stringify(this.quizCopy)
        }
    },
    watch: {
        quiz: {
            handler(newQuiz) {
                // Update local copy if prop changes
                this.quizCopy = JSON.parse(JSON.stringify(newQuiz));
            },
            deep: true
        }
    }
};
</script>
