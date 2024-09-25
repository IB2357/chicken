<template>
  <header>
    <div>
      <nav>
        <!-- <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink> -->
        <button @click="handleSignOut" v-if="isLoggedIn&&false">Sign Out</button>  <!--brocked for debuging-->
      </nav>
    </div>
  </header>

  <RouterView />
</template>


<script setup>
import { onMounted, ref } from "vue";
// import { RouterLink, RouterView } from 'vue-router'
import { RouterView, useRouter } from 'vue-router'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

const router = useRouter();
const isLoggedIn = ref(false);
let auth;

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push('/sign-in');  
  }).catch((error) => {
    console.error('Error during sign out:', error);
  });
};
</script>