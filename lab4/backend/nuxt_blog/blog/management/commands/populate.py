from django.core.management.base import BaseCommand
from blog.models import User, Post

class Command(BaseCommand):
    help = 'Populate the database with initial data'

    def handle(self, *args, **kwargs):
        users_data = [
            { "name": "Mark Twen", "age": 29, "address": "New York, USA", "avatar": "pfp_1.svg", "email": None },
            { "name": "Katherine Johns", "age": 25, "address": "Los Angeles, USA", "avatar": "pfp_2.svg", "email": None },
            { "name": "Sally Robinson", "age": 31, "address": "Seattle, USA", "avatar": "pfp_3.svg", "email": None },
            { "name": "Stevie", "age": 22, "address": "Miami, USA", "avatar": "pfp_4.svg", "email": None },
            { "name": "Jenna Paul", "age": 28, "address": "Chicago, USA", "avatar": "pfp_5.svg", "email": None },
            { "name": "David King", "age": 30, "address": "Dallas, USA", "avatar": "pfp_6.svg", "email": None },
            { "name": "Michael Hart", "age": 27, "address": "San Francisco, USA", "avatar": "pfp_7.svg", "email": None },
            { "name": "Olivia George", "age": 24, "address": "Boston, USA", "avatar": "pfp_8.svg", "email": None },
            { "name": "Chris Nolan", "age": 26, "address": "Austin, USA", "avatar": "pfp_9.svg", "email": None },
            { "name": "Isla Fisher", "age": 23, "address": "Phoenix, USA", "avatar": "pfp_10.svg", "email": None },
            { "name": "Robert Quinn", "age": 33, "address": "Philadelphia, USA", "avatar": "pfp_11.svg", "email": None },
            { "name": "Lily Evans", "age": 29, "address": "San Diego, USA", "avatar": "pfp_12.svg", "email": None },
            { "name": "Dylan Brooks", "age": 32, "address": "Portland, USA", "avatar": "pfp_13.svg", "email": None },
            { "name": "Sophia Perez", "age": 21, "address": "Las Vegas, USA", "avatar": "pfp_14.svg", "email": None },
            { "name": "Jacob Lee", "age": 28, "address": "Seattle, USA", "avatar": "pfp_15.svg", "email": None },
            { "name": "Emily Rose", "age": 30, "address": "Atlanta, USA", "avatar": "pfp_16.svg", "email": None },
            { "name": "Aaron Clark", "age": 26, "address": "Denver, USA", "avatar": "pfp_17.svg", "email": None },
            { "name": "Grace Wilson", "age": 27, "address": "San Jose, USA", "avatar": "pfp_18.svg", "email": None },
            { "name": "Ethan Turner", "age": 24, "address": "Orlando, USA", "avatar": "pfp_19.svg", "email": None },
            { "name": "Mia Carter", "age": 29, "address": "Charlotte, USA", "avatar": "pfp_20.svg", "email": None }
        ]

        posts_data = [
            { "user_id": 1, "pub_date": "2024-09-26", "rating": 5, "commentary": "This is awesome!", "topic": "Design", "is_liked": False, "like_count": 0 },
            { "user_id": 1, "pub_date": "2024-09-27", "rating": 5, "commentary": "This is my second post!", "topic": "Science", "is_liked": False, "like_count": 0 },
            { "user_id": 2, "pub_date": "2024-09-25", "rating": 4, "commentary": "I lost the exit.", "topic": "Health", "is_liked": False, "like_count": 1 },
            { "user_id": 3, "pub_date": "2024-09-24", "rating": 5, "commentary": "Emotions overload!", "topic": "Science", "is_liked": False, "like_count": 0 },
            { "user_id": 4, "pub_date": "2024-09-23", "rating": 3, "commentary": "Needs improvement", "topic": "Design", "is_liked": False, "like_count": 1 },
            { "user_id": 5, "pub_date": "2024-09-22", "rating": 4, "commentary": "Fantastic visuals!", "topic": "Business", "is_liked": False, "like_count": 2 },
            { "user_id": 6, "pub_date": "2024-09-21", "rating": 3, "commentary": "A bit slow.", "topic": "Technology", "is_liked": False, "like_count": 4 },
            { "user_id": 7, "pub_date": "2024-09-20", "rating": 5, "commentary": "Unforgettable journey.", "topic": "Science", "is_liked": False, "like_count": 3 },
            { "user_id": 8, "pub_date": "2024-09-19", "rating": 4, "commentary": "Such a peaceful vibe.", "topic": "Technology", "is_liked": False, "like_count": 1 },
            { "user_id": 9, "pub_date": "2024-09-06", "rating": 2, "commentary": "Could be better.", "topic": "Design", "is_liked": False, "like_count": 7 },
            { "user_id": 10, "pub_date": "2024-09-13", "rating": 5, "commentary": "Pure joy!", "topic": "Business", "is_liked": False, "like_count": 5 },
            { "user_id": 11, "pub_date": "2024-09-11", "rating": 3, "commentary": "Interesting concept.", "topic": "Technology", "is_liked": False, "like_count": 2 },
            { "user_id": 12, "pub_date": "2024-09-12", "rating": 4, "commentary": "Great atmosphere!", "topic": "Science", "is_liked": False, "like_count": 1 },
            { "user_id": 13, "pub_date": "2024-09-07", "rating": 2, "commentary": "Too chaotic.", "topic": "Design", "is_liked": False, "like_count": 0 },
            { "user_id": 14, "pub_date": "2024-09-16", "rating": 5, "commentary": "I loved every second!", "topic": "Business", "is_liked": False, "like_count": 2 },
            { "user_id": 15, "pub_date": "2024-09-09", "rating": 3, "commentary": "Quite engaging.", "topic": "Technology", "is_liked": False, "like_count": 6 },
            { "user_id": 16, "pub_date": "2024-09-10", "rating": 4, "commentary": "Beautiful scenery.", "topic": "Health", "is_liked": False, "like_count": 8 },
            { "user_id": 17, "pub_date": "2024-09-08", "rating": 2, "commentary": "Not my style.", "topic": "Science", "is_liked": False, "like_count": 0 },
            { "user_id": 18, "pub_date": "2024-09-12", "rating": 5, "commentary": "Incredible journey!", "topic": "Design", "is_liked": False, "like_count": 9 },
            { "user_id": 19, "pub_date": "2024-09-07", "rating": 4, "commentary": "A wonderful surprise!", "topic": "Technology", "is_liked": False, "like_count": 3 },
            { "user_id": 20, "pub_date": "2024-09-14", "rating": 5, "commentary": "Masterpiece!", "topic": "Business", "is_liked": False, "like_count": 2 }
        ]

        # Create users
        for user in users_data:
            User.objects.create(
                name=user["name"],
                age=user["age"],
                address=user["address"],
                avatar=f'/assets/{user["avatar"]}',  # Adjust the path as necessary
                email=user["email"]
            )

        # Create posts
        for post in posts_data:
            Post.objects.create(
                user_id=post["user_id"],
                pub_date=post["pub_date"],
                rating=post["rating"],
                commentary=post["commentary"],
                topic=post["topic"],
                is_liked=post["is_liked"],
                like_count=post["like_count"]
            )

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with initial data'))
