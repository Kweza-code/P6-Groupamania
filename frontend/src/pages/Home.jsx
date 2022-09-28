import React from "react";
import Footer from "../components/Footer";
import Post from "../components/Post";

const Home = () => {
  return (
    <div>
      <section class="posts">
        <Post
          date="16/02/2022 à 16h23"
          description="Salut, hier je suis parti manger un burger"
          author="@Adrien"
          title="Le burger"
          dislike="32"
          like="4"
        />
        <Post
          date="16/02/2022 à 16h25"
          description="Salut, hier je suis parti manger à la cantine"
          author="@Julien"
          title="La cantine"
          dislike="34"
          like="42"
        />
        <Post
          date="16/02/2022 à 18h"
          description="Salut, je suis parti aux toilettes"
          author="@Tom"
          title="Les toilettes"
          dislike="35"
          like="41"
        />
      </section>
      <Footer />
    </div>
  );
};

export default Home;
