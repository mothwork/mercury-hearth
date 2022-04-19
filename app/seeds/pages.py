from app.models import db, Page


# Adds a demo user, you can add other users here if you want
def seed_pages():
    mahir = Page(
        title='The Mahirid Empire',
        image='',
        content='''{"pageType":"country",
                    "name":"Mahirid Empire",
                    "capital":"Grand Mahir",
                    "region":"Mahirum",
                    "government":"Monarchy",
                    "population":"10 million",
                    "religions":"Fretynir, The Many",
                    "imports":"Grain, Raw Metals, Timber",
                    "exports":"Machinery, Ships, Metalwork, Stone",
                    "content":"A great deal of ink has been spilled..."}''',
        userId=1,
        projectId=1
    )
    sciiot = Page(
        title='Sciiot',
        image='',
        content='''{"pageType":"country",
                    "name":"sciiot",
                    "capital":"Ris Sciiot",
                    "region":"Nar-Loro Desert",
                    "government":"Camshirin Atenvenhood",
                    "population":"4 million",
                    "religions":"Osen, Sihlmår, Kilndur, Omrun",
                    "imports":"Wine, Wax, Timber, Grain, Fruit, Raw Metals, Precious Metals, Silk",
                    "exports":"Oil, Textiles, Spices, Fine Metalwork, Alchemy Supplies, Glass, Armor",
                    "content":"A great deal of ink has been spilled on the topic of Sciiotian conquest of Onyvada..."}''',
        userId=1,
        projectId=1
    )
    actreatylands = Page(
        title='Alton-Capurra Treatylands',
        image='',
        content='''{"pageType":"country",
                    "name":"Alton-Capurra Treatylands",
                    "capital":"Alton",
                    "region":"Mistvaal/Vaalcoast",
                    "government":"Treaty-based Coalition",
                    "population":"12 million",
                    "religions":"Osen, The Many, Sihlmår",
                    "imports":"Textiles, Spices, Wax, Grain, Glass, Spices",
                    "exports":"Wine, Ships, Fish, Fine Metalwork, Grain, Fruit, Raw Metals",
                    "content":"A great deal of ink has been spilled on the topic of Alton's involvement in the Blue Wars from AG1215 to AG1232..."}''',
        userId=1,
        projectId=1
    )
    tessigen = Page(
        title='Tessigen',
        image='',
        content='''{"pageType":"country",
                    "name":"Tessigen",
                    "capital":"Volen",
                    "region":"Southern Tessegia",
                    "government":"Hereditary Monarchy",
                    "population":"~200,000",
                    "religions":"None",
                    "imports":"None",
                    "exports":"None",
                    "content":"The relatively safe lands of Tessigen are where you find simple farmers who through ancient tradition have domesticated the many rogue elementals which wander Otriman..."}''',
        userId=1,
        projectId=2
    )
    lastRedoubt = Page(
        title='The Last Redoubt',
        image='',
        content='''{"pageType":"country",
                    "name":"The Last Redoubt",
                    "capital":"Itself",
                    "region":"The Night Lands",
                    "government":"",
                    "population":"",
                    "religions":"None",
                    "imports":"None",
                    "exports":"None",
                    "content":"Maintained by the Earth Current, the Last Redoubt is..."}''',
        userId=1,
        projectId=3
    )

    db.session.add(mahir)
    db.session.add(sciiot)
    db.session.add(tessigen)
    db.session.add(actreatylands)
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
