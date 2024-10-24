import {defineStore} from 'pinia';

export const useStore = defineStore('main', {
    state: () => ({
        users: [
            { id: 1, name: "Mark Twen", Avatar: "/assets/pfp_1.svg" },
            { id: 2, name: "Katherine Johns", Avatar: "/assets/pfp_2.svg" },
            { id: 3, name: "Sally Robinson", Avatar: "/assets/pfp_3.svg" },
            { id: 4, name: "Stevie", Avatar: "/assets/pfp_4.svg" },
            { id: 5, name: "Jenna Paul", Avatar: "/assets/pfp_5.svg" },
            { id: 6, name: "David King", Avatar: "/assets/pfp_6.svg" },
            { id: 7, name: "Michael Hart", Avatar: "/assets/pfp_7.svg" },
            { id: 8, name: "Olivia George", Avatar: "/assets/pfp_8.svg" },
            { id: 9, name: "Chris Nolan", Avatar: "/assets/pfp_9.svg" },
            { id: 10, name: "Isla Fisher", Avatar: "/assets/pfp_10.svg" },
            { id: 11, name: "Robert Quinn", Avatar: "/assets/pfp_11.svg" },
            { id: 12, name: "Lily Evans", Avatar: "/assets/pfp_12.svg" },
            { id: 13, name: "Dylan Brooks", Avatar: "/assets/pfp_13.svg" },
            { id: 14, name: "Sophia Perez", Avatar: "/assets/pfp_14.svg" },
            { id: 15, name: "Jacob Lee", Avatar: "/assets/pfp_15.svg" },
            { id: 16, name: "Emily Rose", Avatar: "/assets/pfp_16.svg" },
            { id: 17, name: "Aaron Clark", Avatar: "/assets/pfp_17.svg" },
            { id: 18, name: "Grace Wilson", Avatar: "/assets/pfp_18.svg" },
            { id: 19, name: "Ethan Turner", Avatar: "/assets/pfp_19.svg" },
            { id: 20, name: "Mia Carter", Avatar: "/assets/pfp_20.svg" }
          ],
        posts: [
            { userId: 1, PubDate: "2024-09-26", Rating: 5, Commentary: "This is awesome!", Topic: "Design", isLiked: false, likeCount: 0 },
            { userId: 2, PubDate: "2024-09-25", Rating: 4, Commentary: "I lost the exit.", Topic: "Health", isLiked: false, likeCount: 1 },
            { userId: 3, PubDate: "2024-09-24", Rating: 5, Commentary: "Emotions overload!", Topic: "Science", isLiked: false, likeCount: 0 },
            { userId: 4, PubDate: "2024-09-23", Rating: 3, Commentary: "Needs improvement", Topic: "Design", isLiked: false, likeCount: 1 },
            { userId: 5, PubDate: "2024-09-22", Rating: 4, Commentary: "Fantastic visuals!", Topic: "Business", isLiked: false, likeCount: 2 },
            { userId: 6, PubDate: "2024-09-21", Rating: 3, Commentary: "A bit slow.", Topic: "Technology", isLiked: false, likeCount: 4 },
            { userId: 7, PubDate: "2024-09-20", Rating: 5, Commentary: "Unforgettable journey.", Topic: "Science", isLiked: false, likeCount: 3 },
            { userId: 8, PubDate: "2024-09-19", Rating: 4, Commentary: "Such a peaceful vibe.", Topic: "Technology", isLiked: false, likeCount: 1 },
            { userId: 9, PubDate: "2024-09-06", Rating: 2, Commentary: "Could be better.", Topic: "Design", isLiked: false, likeCount: 7 },
            { userId: 10, PubDate: "2024-09-13", Rating: 5, Commentary: "Pure joy!", Topic: "Business", isLiked: false, likeCount: 5 },
            { userId: 11, PubDate: "2024-09-11", Rating: 3, Commentary: "Interesting concept.", Topic: "Technology", isLiked: false, likeCount: 2 },
            { userId: 12, PubDate: "2024-09-12", Rating: 4, Commentary: "Great atmosphere!", Topic: "Science", isLiked: false, likeCount: 1 },
            { userId: 13, PubDate: "2024-09-07", Rating: 2, Commentary: "Too chaotic.", Topic: "Design", isLiked: false, likeCount: 0 },
            { userId: 14, PubDate: "2024-09-16", Rating: 5, Commentary: "I loved every second!", Topic: "Business", isLiked: false, likeCount: 2 },
            { userId: 15, PubDate: "2024-09-09", Rating: 3, Commentary: "Quite engaging.", Topic: "Technology", isLiked: false, likeCount: 6 },
            { userId: 16, PubDate: "2024-09-10", Rating: 4, Commentary: "Beautiful scenery.", Topic: "Health", isLiked: false, likeCount: 8 },
            { userId: 17, PubDate: "2024-09-08", Rating: 2, Commentary: "Not my style.", Topic: "Science", isLiked: false, likeCount: 0 },
            { userId: 18, PubDate: "2024-09-12", Rating: 5, Commentary: "Incredible journey!", Topic: "Design", isLiked: false, likeCount: 9 },
            { userId: 19, PubDate: "2024-09-07", Rating: 4, Commentary: "A wonderful surprise!", Topic: "Technology", isLiked: false, likeCount: 3 },
            { userId: 20, PubDate: "2024-09-14", Rating: 5, Commentary: "Masterpiece!", Topic: "Business", isLiked: false, likeCount: 2 }
          ],
    })
})