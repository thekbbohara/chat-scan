import http from "http";
import { configDotenv } from "dotenv";
import { getComments } from "./api/youtube.js";
import { getActiveLiveChatId } from "./utils/getActiveLiveChatId.js";
import { Comment } from "./types/youtube.js";
import { filterComments } from "./api/gemini.js";
configDotenv();

const init = async () => {
  const httpServer = http.createServer();
  const PORT = process.env.PORT ?? 8080;

  httpServer.listen(PORT, () =>
    console.log(`HTTP Server at localhost:${PORT}`),
  );
};
// init();
// getActiveLiveChatId(vidoeurl)
// await getCmt(
//   "Cg0KC2pmS2ZQZnlKUmRrKicKGFVDU0o0Z2tWQzZOcnZJSTh1bXp0ZjBPdxILamZLZlBmeUpSZGs",
// );

// Example use case
const selectedComments: Comment[] = [];
const newComments: Comment[] = [
  {
    id: "LCC.EhwKGkNNZUtzb2otMVlvREZZb0sxZ0FkcFZrN0FB",
    author: "a.",
    message: "no love no trouble",
    profileImageUrl:
      "https://yt3.ggpht.com/9Qh3g2y8feF0iAZfdx1856Bvpnb8qy6eGLhCgmjqfp55h4yy7VjCWFBmTjV20IhpptbEo2C4ehA=s88-c-k-c0x00ffffff-no-rj",
  },
  {
    id: "LCC.EhwKGkNNcWgzSWotMVlvREZXdlp3Z1FkWjFVRDFR",
    author: "Miquéas Costa",
    message: "Já puxa um zap e vai assistir um filmezin no RAVE",
    profileImageUrl:
      "https://yt3.ggpht.com/CgIGrDlq6kXbRcLm07UIEUQrriIidoeB6LI3gU8HqTW3LlhZhwZ2mIIAqaGyLO99sSw4zK15_tg=s88-c-k-c0x00ffffff-no-rj",
  },
  {
    id: "LCC.EhwKGkNNkH4txVSbx2evycvfwSzjToS1VvJ6Ex1lI",
    author: "DevTalker",
    message: "What are your thoughts on WebAssembly in 2025?",
    profileImageUrl:
      "https://yt3.ggpht.com/7FHPMY0Aq-0h6Gn06-Fh1gGaqnPUw2A-KZa9bM0M00eAAp3izOlz-4WBWqIYYUJjld3AXOeIQkE=s88-c-k-c0x00ffffff-no-rj",
  },
  {
    id: "LCC.EhwKGkNNcWgzUVnxVcz2t4rfp31QmGoZTgp4tG7K80",
    author: "CodeMaster99",
    message: "Could you do a deep dive into modern JavaScript frameworks?",
    profileImageUrl:
      "https://yt3.ggpht.com/WcY1t4W8irRD-sNRbwbsq8dJ8YLOyX9zmQpONVxUeT6vmnpF6eTnfxb6Kbh8ZdbWxftx1Hb5XqE=s88-c-k-c0x00ffffff-no-rj",
  },
  {
    id: "LCC.EhwKGkNNc3vFGUGk98xfgrIyrnk2NvDldfRkG3mpH8",
    author: "WebDev Guru",
    message: "I love how you explain concepts in such detail, very helpful!",
    profileImageUrl:
      "https://yt3.ggpht.com/Rhjl9uwK9pvBDuSVmcUtQ--N32YHqCBIRKvq6SHh_aHV1t7w7Vsl6ZsGV1EGNn5MiiQwDlAaViY=s88-c-k-c0x00ffffff-no-rj",
  },
  {
    id: "LCC.EhwKGkNNk4vW7gZpMtO8mfwqXJr3NKf41Z2mGbIUbI",
    author: "CoderBoyX",
    message: "Just got started with React, any tips for beginners?",
    profileImageUrl:
      "https://yt3.ggpht.com/h33GJ6mPT6vLrSdzv5k0bhvDvgkDFWzvBz6KnmdjiuEk9ADh_6ckB_-Pq7Xr6mXvShZGxAqz4tg=s88-c-k-c0x00ffffff-no-rj",
  },
  {
    id: "LCC.EhwKGkNNkFjs75Zq7eF5KwMmH2MLlYqDph8V0cnfEk",
    author: "ReactMaster",
    message: "Is TypeScript becoming essential in web development now?",
    profileImageUrl:
      "https://yt3.ggpht.com/XzXQ8l6Oke4OUgHzfOd9Zbm3J-hctz5LrJKV5tpB6YVpK8sHZP_pvcVYXYzdX6X_Vou6qAZtaVQ=s88-c-k-c0x00ffffff-no-rj",
  },
  {
    id: "LCC.EhwKGkNN9opd0U77Rl7I7gIoZ_dvcq5v0LvWLRhw34",
    author: "TechSavvy",
    message: "Which frontend framework do you recommend for 2025?",
    profileImageUrl:
      "https://yt3.ggpht.com/M4Y7tbwOWw6yG58e9Qz8bKYFG9tFf6gM_GarB8RepaFzOAytrAqKH4F4vI6qSxy8KHhLgFFG70g=s88-c-k-c0x00ffffff-no-rj",
  },
  {
    id: "LCC.EhwKGkNNlKT0t9v5b6MvgxtYX8r6Dq4p_1Bd_QhXiA",
    author: "FrontendGuru",
    message: "Can you discuss the importance of SEO in modern web development?",
    profileImageUrl:
      "https://yt3.ggpht.com/Zbs41J15V2SK1_UKH5llfA0N6_AqEw0kTBqZTjSZz8nglgDiWRb2vP2TYwDsWgkb06ewGhdy7Q8I=s88-c-k-c0x00ffffff-no-rj",
  },
  {
    id: "LCC.EhwKGkNNbdc1g5fvzSTm75gF7Jb0U7lTpZ8OrvcBsA",
    author: "CodeWizard",
    message: "React vs Vue, which one should I learn first?",
    profileImageUrl:
      "https://yt3.ggpht.com/JYsvXTQ0H0EC3BlOnv0tBh2iR8m5jv99jXKIsNvhPaEHkwnDw9i3U4iY1KYc_JmDWbWNYtZdYniE=s88-c-k-c0x00ffffff-no-rj",
  },
  {
    id: "LCC.EhwKGkNNvcXDhI1gh9m4czqOsZXghqkpHrshfJrtXM",
    author: "JavaExpert",
    message: "Any tips on debugging complex JavaScript issues?",
    profileImageUrl:
      "https://yt3.ggpht.com/lqlBsqXj5xLVv4z8ovweqd3lExC5elzHl7SYWeZFLQ36noEkRGOGcVpM8-f-vvTeZn64aZZZZRs=s88-c-k-c0x00ffffff-no-rj",
  },
  {
    id: "LCC.EhwKGkNNmhc1g97fvB1A3A2uDjZ5RUqYOmsYIKvq28",
    author: "DevLover",
    message: "Which is the best text editor for web developers?",
    profileImageUrl:
      "https://yt3.ggpht.com/Fg_dI5qDPj3p_VP3SKfe_Fg0bZ-dVuZWgbfNBXlX2T2xjmMLNrPOVZcQe25Qm4S3fIF8Khq9G28=s88-c-k-c0x00ffffff-no-rj",
  },
  {
    id: "LCC.EhwKGkNNjuA14vO5BHR5MOoZ2vV05rCq2OjMqxWqbY",
    author: "WebMaster99",
    message: "Could you explain more about Single Page Applications?",
    profileImageUrl:
      "https://yt3.ggpht.com/W9QUMCz8ar_hvJRE5r8zjVxSu59on7Ih2qceeq0JFs4M58NEyoqxytDXIhbR7e-OJZ5yd2zA3P_Q=s88-c-k-c0x00ffffff-no-rj",
  },
  {
    id: "LCC.EhwKGkNNjfnHjGxVkkq8hnVQyXbK3KEmKnkRbdpHE",
    author: "TechieHunter",
    message: "What are the pros and cons of serverless architecture?",
    profileImageUrl:
      "https://yt3.ggpht.com/XDhwCKD6P_nNK6T8D01jpcg-c-a0Vmm1_R_nlQJ1w44VoFcA3EpeMYIowQJXflbfM5sMTwphO24=s88-c-k-c0x00ffffff-no-rj",
  },
  {
    id: "LCC.EhwKGkNN91Rkj98mtU04vnD8uQRkdv9g1-oz3QsZD8",
    author: "BackendMaster",
    message: "How do you handle authentication in a React app?",
    profileImageUrl:
      "https://yt3.ggpht.com/z_fLtPhNpl7qfTynJxBlcP4LnT-KzLV9Nl12yUgOlDqF_tffEvkzNxU1iRRYm1QtLdnf7JqB5L4=s88-c-k-c0x00ffffff-no-rj",
  },
  {
    id: "LCC.EhwKGkNNg9pc9jbn0INshZoXvkYtbSYnkgOs07A1F4",
    author: "ProgrammerX",
    message: "Is Vue.js good for large-scale applications?",
    profileImageUrl:
      "https://yt3.ggpht.com/qj94WqXGoNoebKMy__M6yQH9c__POttXyN0VXb5zEyPHp4oJ6Zm4aSjp9okbcklBvL8b0Rrgm6xs=s88-c-k-c0x00ffffff-no-rj",
  },
  {
    id: "LCC.EhwKGkNNllV9ZlZmhK4dgsR9I6_F9VfwFiwt6wbqxE",
    author: "DevMaster",
    message: "How do you optimize a React application?",
    profileImageUrl:
      "https://yt3.ggpht.com/Zy7vXo4a7_qXn2iAGVjOAxctYHGnVZTfdAfpBf13FFREh8A_aH6Z7zCyk8jbm7UwPndFb-_aRRE=s88-c-k-c0x00ffffff-no-rj",
  },
  {
    id: "LCC.EhwKGkNN7gCFFbnDh9J6znTxp1pHqXAnwdoEw6l3XY",
    author: "FullstackPro",
    message: "Can you explain how you set up state management in React?",
    profileImageUrl:
      "https://yt3.ggpht.com/PzRir9cZgUpytjIZyYcRE8iz9_NI_8_bf14LrdjM9-oNzpcj1lzN5z5NJbS6Z9LzLUKqVGhnkyI=s88-c-k-c0x00ffffff-no-rj",
  },
  {
    id: "LCC.EhwKGkNN4F7dFwUz3gCo2MR0d3e7ubAGfiRSPXbFGk",
    author: "DebugGenius",
    message: "What are some advanced debugging techniques for JavaScript?",
    profileImageUrl:
      "https://yt3.ggpht.com/n5LQvAybQUjqFjqqTphQpkM5cq-P2z1mFYbFowRUHhmv02Pyk0FdZGy1Ax3ES5HIsdoXY8_p7co=s88-c-k-c0x00ffffff-no-rj",
  },
  {
    id: "LCC.EhwKGkNNxdRG6afImr-9MnYn6h4HV2R6OMblZBxI3I",
    author: "JSPro",
    message: "How do you handle forms in React?",
    profileImageUrl:
      "https://yt3.ggpht.com/jqxhwwfdf9SXBwXTmwEnTkReOmqEjWV3--Xs7g0rS7uwg81TwPi3OLsEwf1V6bVfiY9fo4jLtvY=s88-c-k-c0x00ffffff-no-rj",
  },
  {
    id: "LCC.EhwKGkNNjF8DdIm8JK7Pa5ovKYsmIV1_b6sExiXv9o",
    author: "CoderTribe",
    message: "Do you recommend using Redux for state management?",
    profileImageUrl:
      "https://yt3.ggpht.com/WF2NZZHoC_oD1tVYoDge52r5s2Kj8gFTGqkQ6IbX4tAqsq_fhbrP6JAtn46TtV7RE3l21W7hAuk=s88-c-k-c0x00ffffff-no-rj",
  },
  {
    id: "LCC.EhwKGkNNc65toXf_r5s_hm_7noXfLj-9cbjo9p1LU0",
    author: "FrontEndFreak",
    message: "Can you explain how virtual DOM works in React?",
    profileImageUrl:
      "https://yt3.ggpht.com/aIGoqJIHYBlW71VZo3ffW9Q7CUw1MpaEDLOSi1apPzZzhm7im31cy0QYhFg2PSeSGcmFjjXniw=s88-c-k-c0x00ffffff-no-rj",
  },
  {
    id: "LCC.EhwKGkNNpfTZZ9oeLOkwkUwXwmLg6jO_M2wx0I9Kkw",
    author: "UXMaster",
    message: "Do you consider UI/UX design important for developers?",
    profileImageUrl:
      "https://yt3.ggpht.com/K_4xlkdi7URg0h_NxwG0nm3Lzz0ZXaHv44S7kQbV6BQ6iJRGFf2G2jbVq9vty3s4iZGf7fzbeJ0=s88-c-k-c0x00ffffff-no-rj",
  },
  {
    id: "LCC.EhwKGkNNpj9_w6RVqZfG8du7TzqXb-RVspQ63_rI00",
    author: "ReactKing",
    message: "What's your take on React Hooks vs Class components?",
    profileImageUrl:
      "https://yt3.ggpht.com/FVrV1XqUSlKnV-Q_VnGp1SyvM3zwALjdKAl6k-Yts4GoMKZT2OMnKNqBAmCdwFGFlRh_oNFVZrA=s88-c-k-c0x00ffffff-no-rj",
  },
  {
    id: "LCC.EhwKGkNNhka0gaYh5y6z2Uvc-JZNYd7tqY36y6hx_w",
    author: "FrontendWizard",
    message: "How do you deal with performance optimization in React?",
    profileImageUrl:
      "https://yt3.ggpht.com/AXwXcbpfPAf9_J5hgZnTXJeEl7w2Hdu_UkYkpAVy4J4n3TYtwstVr6s34duoYZPvClXHQIZfjvA=s88-c-k-c0x00ffffff-no-rj",
  },
  {
    id: "LCC.EhwKGkNNdLv5l2GydhC-MjD8AkS7zZn3cS9v3X8iW0",
    author: "JSDevMaster",
    message: "Could you go over the process of integrating APIs in React?",
    profileImageUrl:
      "https://yt3.ggpht.com/JLRo6X7glbtWvm_F5yMvjjMfskggkj3uSkWX1p-ODcF0t0tFGHjKn99c1ZxplJ9k2Z4RpTlgkAw=s88-c-k-c0x00ffffff-no-rj",
  },
  {
    id: "LCC.EhwKGkNNiw9Nw8VVN8tQBy9mKK7c4mlji_-EiyTqgA",
    author: "CodeManiac",
    message: "What tools do you use for debugging in React?",
    profileImageUrl:
      "https://yt3.ggpht.com/xvXY-X_bUo47VYZ9_vgn9tTQcKXyOmc6-xfbIYjMgsQ57EkwBdjXrsrw5HQ7L4zFneV4H1XqFTM=s88-c-k-c0x00ffffff-no-rj",
  },
  {
    id: "LCC.EhwKGkNN9L6cMcvZZ_k9G4QJrwstmuTY_5VliXvNm8",
    author: "TechDev",
    message: "How do you approach building scalable web applications?",
    profileImageUrl:
      "https://yt3.ggpht.com/iyfqoyscvTLjch_xgN1syfbdwV7iR10Dk4B9QKps-pIDZErSgwg31GRQyijWJdQ1zYk_Vl_eQvA=s88-c-k-c0x00ffffff-no-rj",
  },
  {
    id: "LCC.EhwKGkNN8S_y1ozRjx9gXHjwFq2QhOp0vChN9rPtxE",
    author: "WebDevKing",
    message:
      "What backend technologies do you think are worth learning in 2025?",
    profileImageUrl:
      "https://yt3.ggpht.com/ew6bAhSv6twsvQf3F_7FO9qsTHeM_lHHHrHKpEv2R9Xqx_-8VYQ5f_eTRNwMIrhbgl4SDrjl8lqA=s88-c-k-c0x00ffffff-no-rj",
  },
];

(async () => {
  try {
    const response = await filterComments(selectedComments, newComments);
    if (response.comments) {
      console.log("Filtered Comments:", response.comments);
      // response.comments.forEach((comment) => {
      // socket.emit("event:newComment", comment);
      // });
    } else {
      console.log("No relevant comments found.");
    }
  } catch (error) {
    console.error("Error processing comments:", error);
  }
})();
