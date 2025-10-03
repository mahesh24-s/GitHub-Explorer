import { useState } from "react";
import { Github } from "lucide-react";
import { SearchBar } from "../components/SearchBar";
import {RepoGrid} from "../components/RepoGrid"
import { UserHeader } from "../components/UserHeader";

const Index = () => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);

  const getUserData = async (name) => {
    setIsLoading(true);

    try {
      // Fetch user data
      const userResponse = await fetch(`https://api.github.com/users/${name.trim()}`);

      if (!userResponse.ok) {
        throw new Error("User not found");
      }

      const userData = await userResponse.json();
      setUserData(userData);

      // Fetch repositories
      const reposResponse = await fetch(
        `https://api.github.com/users/${name.trim()}/repos?sort=updated&per_page=30`
      );

      if (!reposResponse.ok) {
        throw new Error("Failed to fetch repositories");
      }

      const reposData = await reposResponse.json();
      // console.log("printing repos data", reposData);
      // console.log("printing user data", userData);
      setRepos(reposData);
    } catch (error) {
      console.log(error);
      setUserData(null);
      setRepos([]);
    } finally {
      setIsLoading(false);
    }
  }

  const fetchUserData = async (name) => {
    if(name != undefined || name != null){
      setUsername(name);
      getUserData(name);
      return ;
    }

    if (!username.trim()) return;
    getUserData(username);
  };


  return (
    <div className="min-h-screen p-6 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Github className="h-12 w-12 text-primary" />
            <h1 className="text-5xl font-bold gradient-text">GitHub Explorer</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover and explore public repositories from any GitHub user
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar
          value={username}
          setUsername={setUsername}
          fetchUserData={fetchUserData}
          isLoading={isLoading}
        />

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-muted-foreground">Loading repositories...</p>
          </div>
        )}

        {/* User Header */}
        {userData && !isLoading && (
          <UserHeader
            username={userData.login}
            avatarUrl={userData.avatar_url}
            name={userData.name}
            bio={userData.bio}
            publicRepos={userData.public_repos}
            profileUrl={userData.html_url}
            location={userData.location}
            company={userData.company}
            blog={userData.blog}
            twitterUsername={userData.twitter_username}
            followers={userData.followers}
            following={userData.following}
          />
        )}

        {/* Repositories Grid */}
        {!isLoading && repos.length > 0 && <RepoGrid repos={repos} />}

        {/* Empty State */}
        {!isLoading && !userData && (
          <div className="text-center py-12">
            <Github className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground text-lg">
              Enter a GitHub username to explore their repositories
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
