import { useState, useRef, useEffect } from "react";
import {
  Search,
  Home,
  Disc,
  ListMusic,
  User,
  BarChart2,
  Plus,
  Heart,
  MoreHorizontal,
  Play,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import axios from "axios";

export default function MusicApp() {
  const [trackLists, setTrackLists] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchInputRef = useRef(null);

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { track },
      } = await axios("api/api/v1/json/2/track.php?m=2115888");
      console.log(track);
      setTrackLists(track);
    };
    fetchData();
  }, []);
  console.log(trackLists);
  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-gray-100 border-r flex flex-col">
          {/* User profile */}
          <div className="p-4 flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src="/placeholder-user.jpg" alt="Joshua" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center">
                <div className="font-medium">Joshua</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
              <div className="text-xs text-gray-500">PREMIUM</div>
            </div>
          </div>

          {/* Browse section */}
          <div className="px-4 pt-6">
            <div className="text-xs font-medium text-gray-500 mb-4">BROWSE</div>
            <nav className="space-y-2">
              <Button
                variant={activeTab === "home" ? "secondary" : "ghost"}
                className="w-full justify-start px-2"
                onClick={() => setActiveTab("home")}
              >
                <Home className="h-4 w-4 mr-3" />
                Home
              </Button>
              <Button
                variant={activeTab === "songs" ? "secondary" : "ghost"}
                className="w-full justify-start px-2"
                onClick={() => setActiveTab("songs")}
              >
                <Disc className="h-4 w-4 mr-3" />
                Songs
              </Button>
              <Button
                variant={activeTab === "playlists" ? "secondary" : "ghost"}
                className="w-full justify-start px-2"
                onClick={() => setActiveTab("playlists")}
              >
                <ListMusic className="h-4 w-4 mr-3" />
                Playlists
              </Button>
              <Button
                variant={activeTab === "just-for-you" ? "secondary" : "ghost"}
                className="w-full justify-start px-2"
                onClick={() => setActiveTab("just-for-you")}
              >
                <User className="h-4 w-4 mr-3" />
                Just for You
              </Button>
              <Button
                variant={activeTab === "top-charts" ? "secondary" : "ghost"}
                className="w-full justify-start px-2"
                onClick={() => setActiveTab("top-charts")}
              >
                <BarChart2 className="h-4 w-4 mr-3" />
                Top Charts
              </Button>
            </nav>
          </div>

          {/* Your playlists section */}
          <div className="px-4 pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs font-medium text-gray-500">
                YOUR PLAYLISTS
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Plus className="h-4 w-4" />
                <span className="sr-only">Add playlist</span>
              </Button>
            </div>
            <nav className="space-y-2">
              <Button
                variant={activeTab === "workout" ? "secondary" : "ghost"}
                className="w-full justify-start px-2"
                onClick={() => setActiveTab("workout")}
              >
                <ListMusic className="h-4 w-4 mr-3" />
                Workout Mix
              </Button>
              <Button
                variant={activeTab === "chillin" ? "secondary" : "ghost"}
                className="w-full justify-start px-2"
                onClick={() => setActiveTab("chillin")}
              >
                <ListMusic className="h-4 w-4 mr-3" />
                Chillin&apos; at Home
              </Button>
              <Button
                variant={activeTab === "booping" ? "secondary" : "ghost"}
                className="w-full justify-start px-2"
                onClick={() => setActiveTab("booping")}
              >
                <ListMusic className="h-4 w-4 mr-3" />
                Booping at Adobe
              </Button>
              <Button
                variant={activeTab === "xd" ? "secondary" : "ghost"}
                className="w-full justify-start px-2"
                onClick={() => setActiveTab("xd")}
              >
                <ListMusic className="h-4 w-4 mr-3" />
                XD 4 Life
              </Button>
            </nav>
          </div>

          <div className="mt-auto p-4">
            <div className="text-xs text-gray-500">Made with Adobe XD</div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 overflow-auto p-6 pb-24">
          {/* Top bar with search and notifications */}
          <div className="flex justify-between items-center mb-6">
            <div className="relative flex items-center">
              <div
                className={cn(
                  "flex items-center overflow-hidden transition-all duration-300 ease-in-out",
                  isSearchExpanded
                    ? "w-64 border border-gray-300 rounded-md"
                    : "w-8 border-b border-transparent"
                )}
              >
                <button
                  onClick={toggleSearch}
                  className="flex h-8 w-8 shrink-0 items-center justify-center text-gray-500 hover:text-gray-700"
                >
                  <Search className="h-5 w-5" />
                </button>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search music, artists, albums..."
                  className={cn(
                    "w-full bg-transparent py-1.5 pl-1 pr-2 text-sm outline-none transition-opacity",
                    isSearchExpanded ? "opacity-100" : "opacity-0"
                  )}
                  onClick={() => setIsSearchExpanded(false)}
                  onBlur={() => {
                    // Only collapse if empty
                    if (!searchInputRef.current?.value) {
                      setIsSearchExpanded(false);
                    }
                  }}
                />
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-10 w-10 relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <Badge className="absolute top-0 right-0 h-5 w-5 flex items-center justify-center p-0 bg-pink-500">
                3
              </Badge>
              <span className="sr-only">Notifications</span>
            </Button>
          </div>

          {/* Featured content cards */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-pink-500 to-pink-600 h-64">
              <div className="absolute top-0 p-8 flex flex-col justify-end">
                <h2 className="text-5xl font-bold text-white mb-0 leading-none">
                  GET LOST
                </h2>
                <p className="text-2xl text-pink-200">in your music.</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute bottom-4 left-4 h-8 w-8 rounded-full bg-transparent text-white border-4 border-white "
              >
                <Play className="h-6 w-6 fill-white" />
                <span className="sr-only">Play</span>
              </Button>
            </div>
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-400 to-blue-500 h-64">
              <div className="absolute top-0 p-8 flex flex-col justify-end">
                <h2 className="text-5xl font-bold text-white mb-0 leading-none">
                  MELLOW
                </h2>
                <p className="text-2xl text-blue-200">beats.</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute bottom-4 left-4 h-8 w-8 rounded-full  bg-transparent text-white border-4 border-white "
              >
                <Play className="h-6 w-6 fill-white" />
                <span className="sr-only">Play</span>
              </Button>
            </div>
          </div>

          {/* Recently played section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Recently Played</h3>
            <div className="space-y-2">
              {trackLists?.length>0 &&
                trackLists.map((track) => (
                  <div
                    key={track.idTrack}
                    className="flex items-center p-2 hover:bg-gray-100 rounded-md"
                  >
                    <div className="h-12 w-12 bg-gray-200 rounded mr-4"></div>
                    <div className="flex-1">
                      <div className="font-medium">{track.strTrack}</div>
                      <div className="text-sm text-gray-500">
                        {track.strArtist}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 mr-4">
                      {Math.floor(track.intDuration / 60000)}:
                      {String(
                        Math.floor((track.intDuration % 60000) / 1000)
                      ).padStart(2, "0")}
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Heart className="h-4 w-4" />
                      <span className="sr-only">Like</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More</span>
                    </Button>
                  </div>
                ))}
            </div>
          </div>

          {/* Recommended section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Recommended For You</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { title: "Best of Blues", artist: "Jazzmaster Bill" },
                { title: "Out of This World", artist: "Lily Wonders" },
                { title: "Acoustics", artist: "The Spaceman" },
              ].map((album, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="h-36 bg-gray-200 rounded-md mb-2"></div>
                  <div className="font-medium">{album.title}</div>
                  <div className="text-sm text-gray-500">{album.artist}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Music Player */}
          <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-pink-500 to-pink-600 text-white p-3 flex items-center z-10">
            <div className="flex items-center flex-1">
              <div className="w-14 h-14 rounded-full bg-pink-700 mr-4 flex-shrink-0 overflow-hidden">
                {/* Album art */}
              </div>
              <div>
                <div className="font-medium">Mind-Blowing</div>
                <div className="text-sm text-pink-200">Various Artists</div>
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-pink-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                  <span className="sr-only">Shuffle</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-pink-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="19 20 9 12 19 4 19 20" />
                    <line x1="5" y1="19" x2="5" y2="5" />
                  </svg>
                  <span className="sr-only">Previous</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-full bg-white text-pink-600 hover:bg-white/90"
                >
                  <Play className="h-6 w-6 fill-current" />
                  <span className="sr-only">Play</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-pink-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="5 4 15 12 5 20 5 4" />
                    <line x1="19" y1="5" x2="19" y2="19" />
                  </svg>
                  <span className="sr-only">Next</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-pink-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="1 4 1 10 16 10 16 4 1 4" />
                    <polygon points="1 20 1 14 16 14 16 20 1 20" />
                    <rect x="16" y="4" width="7" height="16" />
                  </svg>
                  <span className="sr-only">Repeat</span>
                </Button>
              </div>

              <div className="flex items-center w-full mt-1 px-4">
                <span className="text-xs mr-2">0:00</span>
                <div className="h-1 flex-1 bg-pink-400/30 rounded-full">
                  <div className="h-1 w-0 bg-white rounded-full"></div>
                </div>
                <span className="text-xs ml-2">9:10</span>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-end space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-pink-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
                <span className="sr-only">Playlist</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-pink-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                </svg>
                <span className="sr-only">Fullscreen</span>
              </Button>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
                <div className="w-24 h-1 bg-pink-400/30 rounded-full">
                  <div className="h-1 w-3/4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Add padding at the bottom to account for the fixed player */}
          <div className="h-20"></div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t p-2 text-xs text-gray-400 text-right">
        Link updated: Aug 4, 2020 at 2:52 PM
      </div>
    </div>
  );
}
