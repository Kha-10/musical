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
  ChevronDown,
  Settings,
  LogOut,
  Bell,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import axios from "axios";

export default function MusicApp() {
  const [trackLists, setTrackLists] = useState(null);
  const [albums, setAlbums] = useState(null);
  const [likedSongs, setLikedSongs] = useState([]);
  const [activeTab, setActiveTab] = useState("home");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchInputRef = useRef(null);

  const apiUrl = 'https://theaudiodb.com/api/v1/json/2/track.php?m=2115888';
  const apiUrlT = 'https://theaudiodb.com/api/v1/json/2/album.php?i=112024'
  const proxyUrl = `${process.env.PROXY_BASE_URL || '/api'}/proxy?url=${encodeURIComponent(apiUrl)}`;
  const proxyUrlT = `${process.env.PROXY_BASE_URL || '/api'}/proxy?url=${encodeURIComponent(apiUrlT)}`;

  const notifications = [
    {
      avatar: "/placeholder.svg?height=32&width=32",
      name: "Maria",
      action: "likes your playlist",
      target: "XD 4 Life",
      time: "2m",
    },
    {
      avatar: "/placeholder.svg?height=32&width=32",
      name: "Jasmine",
      action: "is currently listening to",
      target: "Best of Blues",
      time: "5m",
    },
    {
      avatar: "/placeholder.svg?height=32&width=32",
      name: "Marc",
      action: "liked your playlist",
      target: "Booping at Adobe",
      time: "15m",
    },
  ];

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  const toggleLike = (songId) => {
    if (likedSongs.includes(songId)) {
      setLikedSongs(likedSongs.filter((id) => id !== songId));
    } else {
      setLikedSongs([...likedSongs, songId]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trackRes, albumRes] = await Promise.all([
          // axios("api/api/v1/json/2/track.php?m=2115888"),
          // axios("api/api/v1/json/2/album.php?i=112024"),
          axios(proxyUrl),
          axios(proxyUrlT),
        ]);
        setTrackLists(trackRes.data.track);
        setAlbums(albumRes.data.album);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-gray-100 h-[650px] border-r flex flex-col rounded-bl-[60px] shadow z-30">
          {/* User profile */}
          <div className="p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full flex items-center px-0 hover:bg-white/20"
                >
                  <Avatar className="h-10 w-10 mr-3 ring-2 ring-white/50">
                    <AvatarImage src="/placeholder-user.jpg" alt="Joshua" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <div className="flex items-center">
                      <div className="font-medium">Joshua</div>
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </div>
                    <div className="text-xs text-gray-400">
                      <span className="text-[10px] border px-1 border-gray-300">
                        PREMIUM
                      </span>
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56"
                align="start"
                sideOffset={0}
              >
                <div className="flex flex-col space-y-4 p-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] px-1 text-green-700 border border-green-700">
                      PREMIUM
                    </span>
                    <span className="text-[10px] text-gray-300">
                      Through 11/2
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Private</span>
                    <Switch />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Explicit Filter</span>
                    <Switch />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Friend Activity</span>
                    <Switch />
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Account Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
          <div className="px-4 pt-6 bg-transparent">
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
        </div>

        {/* Main content area */}
        <div className="flex-1 h-[650px] overflow-auto p-6 pb-24 rounded-br-[30px] shadow bg-white z-30">
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 relative bg-white/50 hover:bg-white/70 rounded-full"
                >
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute top-0 right-0 h-5 w-5 flex items-center justify-center p-0 bg-pink-500">
                    3
                  </Badge>
                  <span className="sr-only">Notifications</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80" align="end" sideOffset={5}>
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.map((notification, index) => (
                  <DropdownMenuItem
                    key={index}
                    className="flex items-center gap-4 p-3"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={notification.avatar} />
                      <AvatarFallback>{notification.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm leading-none">
                        <span className="font-medium">{notification.name}</span>{" "}
                        {notification.action}{" "}
                        <span className="font-medium">
                          {notification.target}
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {notification.time}
                      </p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Featured content cards */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-pink-500 to-blue-500 h-64 transition-transform hover:scale-105 hover:shadow-xl">
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
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-cyan-400 to-blue-500 h-64 transition-transform hover:scale-105 hover:shadow-x">
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
          <div className="flex gap-3">
            <div className="mb-8 w-full">
              <h3 className="text-xl font-bold mb-4">Recently Played</h3>
              <div className="space-y-2">
                {trackLists?.length > 0 &&
                  trackLists.map((track) => (
                    <div
                      key={track.idTrack}
                      className="flex items-center p-2 gap-2 hover:bg-gray-100 rounded-md relative"
                    >
                      <div className="relative group h-12 w-12">
                        {/* Background Box */}
                        <div className="h-12 w-12 bg-gray-200 rounded mr-4"></div>

                        {/* Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100 rounded-md">
                          <button className="flex h-8 w-8 bg-transparent border-2 p-2 border-white text-white items-center justify-center rounded-full shadow-lg">
                            <Play className="h-6 w-6 fill-white" />
                          </button>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{track.strTrack}</div>
                      </div>
                      <div className="flex-1">
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
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => toggleLike(track.idTrack)}
                      >
                        <Heart
                          className={cn("h-5 w-5", {
                            "fill-rose-500 text-rose-500": likedSongs.includes(
                              track.idTrack
                            ),
                          })}
                        />
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
                {albums?.length > 0 &&
                  albums.map((album) => (
                    <div
                      key={album.idAlbum}
                      className="group cursor-pointer relative"
                    >
                      {album.strAlbumThumb ? (
                        <img
                          src={album.strAlbumThumb}
                          alt="album_cover"
                          className="h-36 w-full rounded-md mb-2"
                        />
                      ) : (
                        <div className="h-36 bg-gray-200 rounded-md mb-2"></div>
                      )}
                      <div className="absolute h-[145px] inset-0 flex items-center justify-center rounded-md bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                        <button className="flex h-8 w-8 bg-transparent border-2 p-2 border-white text-white items-center justify-center rounded-full shadow-lg">
                          <Play className="h-6 w-6 fill-white" />
                        </button>
                      </div>
                      <div className="font-medium">{album.strAlbum}</div>
                      <div className="text-sm text-gray-500">
                        {album.strArtist}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Music Player */}
      <div className="fixed h-[250px] bottom-0 pt-32 left-0 right-0 bg-gradient-to-r from-pink-500 to-pink-600 text-white p-3 flex items-center z-10">
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
    </div>
  );
}
