from app.models import db, Project


# Adds a demo user, you can add other users here if you want
def seed_projects():
    projectAu = Project(
        title='Project Au',
        description='This project describes The Travelled Lands',
        userId=1
    )
    projectAg = Project(
        title='Project Ag',
        description='This project describes Otriman, a world of great mystery.',
        userId=1
    )
    nightLands = Project(
        title='Night Lands',
        description="This project describes the Night Lands, an extension of William Hope Hodgson's work",
        userId=1
    )

    db.session.add(projectAu)
    db.session.add(projectAg)
    db.session.add(nightLands)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_projects():
    db.session.execute('TRUNCATE projects RESTART IDENTITY CASCADE;')
    db.session.commit()