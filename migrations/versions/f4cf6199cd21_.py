"""empty message

Revision ID: f4cf6199cd21
Revises: 0e0e70bcea47
Create Date: 2022-04-19 10:58:05.414583

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f4cf6199cd21'
down_revision = '0e0e70bcea47'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('pages', sa.Column('image', sa.String(length=250), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('pages', 'image')
    # ### end Alembic commands ###
