import logging
from typing import Optional, Dict, Any, List

from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from models.service_bookings import Service_bookings

logger = logging.getLogger(__name__)


# ------------------ Service Layer ------------------
class Service_bookingsService:
    """Service layer for Service_bookings operations"""

    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, data: Dict[str, Any]) -> Optional[Service_bookings]:
        """Create a new service_bookings"""
        try:
            obj = Service_bookings(**data)
            self.db.add(obj)
            await self.db.commit()
            await self.db.refresh(obj)
            logger.info(f"Created service_bookings with id: {obj.id}")
            return obj
        except Exception as e:
            await self.db.rollback()
            logger.error(f"Error creating service_bookings: {str(e)}")
            raise

    async def get_by_id(self, obj_id: int) -> Optional[Service_bookings]:
        """Get service_bookings by ID"""
        try:
            query = select(Service_bookings).where(Service_bookings.id == obj_id)
            result = await self.db.execute(query)
            return result.scalar_one_or_none()
        except Exception as e:
            logger.error(f"Error fetching service_bookings {obj_id}: {str(e)}")
            raise

    async def get_list(
        self, 
        skip: int = 0, 
        limit: int = 20, 
        query_dict: Optional[Dict[str, Any]] = None,
        sort: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Get paginated list of service_bookingss"""
        try:
            query = select(Service_bookings)
            count_query = select(func.count(Service_bookings.id))
            
            if query_dict:
                for field, value in query_dict.items():
                    if hasattr(Service_bookings, field):
                        query = query.where(getattr(Service_bookings, field) == value)
                        count_query = count_query.where(getattr(Service_bookings, field) == value)
            
            count_result = await self.db.execute(count_query)
            total = count_result.scalar()

            if sort:
                if sort.startswith('-'):
                    field_name = sort[1:]
                    if hasattr(Service_bookings, field_name):
                        query = query.order_by(getattr(Service_bookings, field_name).desc())
                else:
                    if hasattr(Service_bookings, sort):
                        query = query.order_by(getattr(Service_bookings, sort))
            else:
                query = query.order_by(Service_bookings.id.desc())

            result = await self.db.execute(query.offset(skip).limit(limit))
            items = result.scalars().all()

            return {
                "items": items,
                "total": total,
                "skip": skip,
                "limit": limit,
            }
        except Exception as e:
            logger.error(f"Error fetching service_bookings list: {str(e)}")
            raise

    async def update(self, obj_id: int, update_data: Dict[str, Any]) -> Optional[Service_bookings]:
        """Update service_bookings"""
        try:
            obj = await self.get_by_id(obj_id)
            if not obj:
                logger.warning(f"Service_bookings {obj_id} not found for update")
                return None
            for key, value in update_data.items():
                if hasattr(obj, key):
                    setattr(obj, key, value)

            await self.db.commit()
            await self.db.refresh(obj)
            logger.info(f"Updated service_bookings {obj_id}")
            return obj
        except Exception as e:
            await self.db.rollback()
            logger.error(f"Error updating service_bookings {obj_id}: {str(e)}")
            raise

    async def delete(self, obj_id: int) -> bool:
        """Delete service_bookings"""
        try:
            obj = await self.get_by_id(obj_id)
            if not obj:
                logger.warning(f"Service_bookings {obj_id} not found for deletion")
                return False
            await self.db.delete(obj)
            await self.db.commit()
            logger.info(f"Deleted service_bookings {obj_id}")
            return True
        except Exception as e:
            await self.db.rollback()
            logger.error(f"Error deleting service_bookings {obj_id}: {str(e)}")
            raise

    async def get_by_field(self, field_name: str, field_value: Any) -> Optional[Service_bookings]:
        """Get service_bookings by any field"""
        try:
            if not hasattr(Service_bookings, field_name):
                raise ValueError(f"Field {field_name} does not exist on Service_bookings")
            result = await self.db.execute(
                select(Service_bookings).where(getattr(Service_bookings, field_name) == field_value)
            )
            return result.scalar_one_or_none()
        except Exception as e:
            logger.error(f"Error fetching service_bookings by {field_name}: {str(e)}")
            raise

    async def list_by_field(
        self, field_name: str, field_value: Any, skip: int = 0, limit: int = 20
    ) -> List[Service_bookings]:
        """Get list of service_bookingss filtered by field"""
        try:
            if not hasattr(Service_bookings, field_name):
                raise ValueError(f"Field {field_name} does not exist on Service_bookings")
            result = await self.db.execute(
                select(Service_bookings)
                .where(getattr(Service_bookings, field_name) == field_value)
                .offset(skip)
                .limit(limit)
                .order_by(Service_bookings.id.desc())
            )
            return result.scalars().all()
        except Exception as e:
            logger.error(f"Error fetching service_bookingss by {field_name}: {str(e)}")
            raise