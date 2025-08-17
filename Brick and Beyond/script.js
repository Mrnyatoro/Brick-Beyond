// Animate On Scroll Init
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
  });

  // Mobile menu toggle
  const menuBtn = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.navbar');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuBtn.classList.toggle('open');
    });
  }

  // Slideshow
  let slides = document.querySelectorAll('.slide');
  let index = 0;
  function showSlide() {
    slides.forEach((s, i) => s.classList.remove('active'));
    slides[index].classList.add('active');
    index = (index + 1) % slides.length;
  }
  showSlide();
  setInterval(showSlide, 4000);
});

// Firebase Init
const firebaseConfig = {
  apiKey: "AIzaSyAA2GEVh7znX5VQxJge_RepongpRqUMXnk",
  authDomain: "brickbeyond-comments.firebaseapp.com",
  projectId: "brickbeyond-comments",
  storageBucket: "brickbeyond-comments.firebasestorage.app",
  messagingSenderId: "229583097868",
  appId: "1:229583097868:web:2f4e059f2875144654de29",
  databaseURL: "https://brickbeyond-comments-default-rtdb.firebaseio.com/"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Submit Comment
document.getElementById("comment-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const message = document.getElementById("message").value.trim();

  if(name && message) {
    db.ref("comments").push({
      name: name,
      message: message,
      timestamp: Date.now()
    });
    document.getElementById("comment-form").reset();
  }
});

// Load Comments
db.ref("comments").on("child_added", function(snapshot) {
  const data = snapshot.val();
  const commentList = document.getElementById("comment-list");

  const div = document.createElement("div");
  div.classList.add("comment");

  const avatar = document.createElement("div");
  avatar.classList.add("avatar");
  avatar.textContent = data.name.charAt(0).toUpperCase();

  const content = document.createElement("div");
  content.classList.add("content");

  const strong = document.createElement("strong");
  strong.textContent = data.name;

  const meta = document.createElement("div");
  meta.classList.add("meta");
  const date = new Date(data.timestamp);
  meta.textContent = date.toLocaleString();

  const msg = document.createElement("p");
  msg.textContent = data.message;

  content.appendChild(strong);
  content.appendChild(meta);
  content.appendChild(msg);

  div.appendChild(avatar);
  div.appendChild(content);

  commentList.prepend(div);
});


