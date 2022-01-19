from app.models import db, Card


# Adds a demo user, you can add other users here if you want
def seed_cards():
    card1 = Card(
        title='',
        description='',
        imageUrl='https://images.unsplash.com/photo-1642606440166-2bd57032ea92?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOXx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
        pageId=1,
        userId=1
    )
    card2 = Card(
        title='',
        description='',
        imageUrl='https://images.unsplash.com/photo-1642420804722-d9811628006c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
        pageId=1,
        userId=1
    )
    card3 = Card(
        title='',
        description='',
        imageUrl='https://images.unsplash.com/photo-1642567474893-1b52c1dd4389?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1OXx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
        pageId=1,
        userId=1
    )

    db.session.add(card1)
    db.session.add(card2)
    db.session.add(card3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_cards():
    db.session.execute('TRUNCATE cards RESTART IDENTITY CASCADE;')
    db.session.commit()
