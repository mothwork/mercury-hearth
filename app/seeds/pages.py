from app.models import db, Page


# Adds a demo user, you can add other users here if you want
def seed_pages():
    mahir = Page(
        title='Great Mahirum',
        content='{"name":"Mahirum", "capital":"Mahir","population":"2 million","content":"A great deal of ink has been spilled..."}',
        userId=1,
        projectId=1
    )
    mahir2 = Page(
        title='Great Mahirum',
        content='{"name":"Mahirum", "capital":"Mahir","population":"2 million","content":"A great deal of ink has been spilled..."}',
        userId=1,
        projectId=1
    )
    mahir3 = Page(
        title='Great Mahirum',
        content='{"name":"Mahirum", "capital":"Mahir","population":"2 million","content":"A great deal of ink has been spilled..."}',
        userId=1,
        projectId=1
    )
    malimon = Page(
        title='Malimon',
        content='{"name":"Malimon", "capital":"No known","population":"Unknown", "content":"The shaded desert Malimon is home to many..."}',
        userId=1,
        projectId=2
    )
    lastRedoubt = Page(
        title='The Last Redoubt',
        content='{"name":"The Last Redoubt", "capital":"Itself", "population":"Unknown", "content":"The last safe place for humanity since the sun was extinguished..."}',
        userId=1,
        projectId=3
    )

    db.session.add(mahir)
    db.session.add(mahir2)
    db.session.add(mahir3)
    db.session.add(malimon)
    db.session.add(lastRedoubt)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_pages():
    db.session.execute('TRUNCATE pages RESTART IDENTITY CASCADE;')
    db.session.commit()
