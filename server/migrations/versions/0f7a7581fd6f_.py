"""empty message

Revision ID: 0f7a7581fd6f
Revises: f13280cac2b9
Create Date: 2023-12-09 15:05:31.449411

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0f7a7581fd6f'
down_revision = 'f13280cac2b9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('cohorts', schema=None) as batch_op:
        batch_op.alter_column('admin_id',
               existing_type=sa.INTEGER(),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('cohorts', schema=None) as batch_op:
        batch_op.alter_column('admin_id',
               existing_type=sa.INTEGER(),
               nullable=True)

    # ### end Alembic commands ###
