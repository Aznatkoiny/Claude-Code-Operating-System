"""
Pattern: Repository Pattern
Purpose: Abstracts data access logic and provides a clean interface for data operations
When to use: Any time you need to interact with a database or external data source
Gotchas: 
  - Don't put business logic in repositories
  - Keep repositories focused on single entities
  - Use dependency injection for database connections
"""

from typing import List, Optional, Dict, Any
from abc import ABC, abstractmethod
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

# Base Repository Interface
class IRepository(ABC):
    """Base repository interface defining standard CRUD operations"""
    
    @abstractmethod
    async def find_by_id(self, id: str) -> Optional[Dict[str, Any]]:
        """Find a single entity by ID"""
        pass
    
    @abstractmethod
    async def find_all(self, filters: Optional[Dict] = None) -> List[Dict[str, Any]]:
        """Find all entities matching filters"""
        pass
    
    @abstractmethod
    async def create(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a new entity"""
        pass
    
    @abstractmethod
    async def update(self, id: str, data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Update an existing entity"""
        pass
    
    @abstractmethod
    async def delete(self, id: str) -> bool:
        """Delete an entity"""
        pass


# Concrete Implementation
class UserRepository(IRepository):
    """Repository for User entities"""
    
    def __init__(self, db_connection):
        """
        Initialize repository with database connection
        
        PATTERN: Dependency injection - pass connection, don't create it
        """
        self.db = db_connection
        self.table_name = "users"
    
    async def find_by_id(self, id: str) -> Optional[Dict[str, Any]]:
        """
        Find user by ID
        
        PATTERN: Always handle not found gracefully
        """
        try:
            query = f"SELECT * FROM {self.table_name} WHERE id = ?"
            result = await self.db.fetch_one(query, [id])
            
            if result:
                logger.info(f"Found user with id: {id}")
                return dict(result)
            
            logger.info(f"User not found with id: {id}")
            return None
            
        except Exception as e:
            logger.error(f"Error finding user by id {id}: {str(e)}")
            raise RepositoryError(f"Failed to find user: {str(e)}")
    
    async def find_all(self, filters: Optional[Dict] = None) -> List[Dict[str, Any]]:
        """
        Find all users matching filters
        
        PATTERN: Build dynamic queries safely
        """
        try:
            query = f"SELECT * FROM {self.table_name}"
            params = []
            
            if filters:
                # PATTERN: Safe query building
                conditions = []
                for key, value in filters.items():
                    conditions.append(f"{key} = ?")
                    params.append(value)
                
                if conditions:
                    query += " WHERE " + " AND ".join(conditions)
            
            # PATTERN: Always limit results to prevent memory issues
            query += " LIMIT 1000"
            
            results = await self.db.fetch_all(query, params)
            return [dict(row) for row in results]
            
        except Exception as e:
            logger.error(f"Error finding users: {str(e)}")
            raise RepositoryError(f"Failed to find users: {str(e)}")
    
    async def create(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Create new user
        
        PATTERN: Always validate and sanitize input
        """
        try:
            # PATTERN: Add metadata
            data['created_at'] = datetime.utcnow()
            data['updated_at'] = datetime.utcnow()
            
            # PATTERN: Build insert query dynamically
            columns = list(data.keys())
            placeholders = ["?" for _ in columns]
            values = list(data.values())
            
            query = f"""
                INSERT INTO {self.table_name} 
                ({', '.join(columns)}) 
                VALUES ({', '.join(placeholders)})
                RETURNING *
            """
            
            result = await self.db.fetch_one(query, values)
            logger.info(f"Created user with id: {result['id']}")
            
            return dict(result)
            
        except Exception as e:
            logger.error(f"Error creating user: {str(e)}")
            raise RepositoryError(f"Failed to create user: {str(e)}")
    
    async def update(self, id: str, data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """
        Update existing user
        
        PATTERN: Partial updates - only update provided fields
        """
        try:
            # PATTERN: Don't allow ID updates
            data.pop('id', None)
            
            # PATTERN: Track update time
            data['updated_at'] = datetime.utcnow()
            
            # Build update query
            set_clauses = [f"{key} = ?" for key in data.keys()]
            values = list(data.values())
            values.append(id)  # For WHERE clause
            
            query = f"""
                UPDATE {self.table_name}
                SET {', '.join(set_clauses)}
                WHERE id = ?
                RETURNING *
            """
            
            result = await self.db.fetch_one(query, values)
            
            if result:
                logger.info(f"Updated user with id: {id}")
                return dict(result)
            
            logger.info(f"User not found for update with id: {id}")
            return None
            
        except Exception as e:
            logger.error(f"Error updating user {id}: {str(e)}")
            raise RepositoryError(f"Failed to update user: {str(e)}")
    
    async def delete(self, id: str) -> bool:
        """
        Delete user (soft delete)
        
        PATTERN: Prefer soft deletes for audit trail
        """
        try:
            # PATTERN: Soft delete by default
            query = f"""
                UPDATE {self.table_name}
                SET deleted_at = ?, updated_at = ?
                WHERE id = ? AND deleted_at IS NULL
            """
            
            now = datetime.utcnow()
            result = await self.db.execute(query, [now, now, id])
            
            if result.rowcount > 0:
                logger.info(f"Soft deleted user with id: {id}")
                return True
            
            logger.info(f"User not found for deletion with id: {id}")
            return False
            
        except Exception as e:
            logger.error(f"Error deleting user {id}: {str(e)}")
            raise RepositoryError(f"Failed to delete user: {str(e)}")
    
    # Additional specialized methods
    async def find_by_email(self, email: str) -> Optional[Dict[str, Any]]:
        """
        Find user by email
        
        PATTERN: Add specialized queries as needed
        """
        try:
            query = f"""
                SELECT * FROM {self.table_name} 
                WHERE email = ? AND deleted_at IS NULL
            """
            result = await self.db.fetch_one(query, [email])
            
            if result:
                return dict(result)
            return None
            
        except Exception as e:
            logger.error(f"Error finding user by email {email}: {str(e)}")
            raise RepositoryError(f"Failed to find user by email: {str(e)}")


# Custom Exception
class RepositoryError(Exception):
    """Custom exception for repository errors"""
    pass


# Usage Example
"""
# In your service layer:
class UserService:
    def __init__(self, user_repository: UserRepository):
        self.repo = user_repository
    
    async def get_user(self, user_id: str):
        user = await self.repo.find_by_id(user_id)
        if not user:
            raise NotFoundError(f"User {user_id} not found")
        return user
    
    async def create_user(self, user_data: dict):
        # Business logic here (validation, etc.)
        return await self.repo.create(user_data)

# In your DI container or main:
db_connection = get_database_connection()
user_repo = UserRepository(db_connection)
user_service = UserService(user_repo)
"""

# ANTI-PATTERN: Don't do this
"""
class BadRepository:
    def __init__(self):
        # ANTI-PATTERN: Creating connection inside repository
        self.db = create_connection()  # Don't do this!
    
    def find_user(self, id):
        # ANTI-PATTERN: Synchronous database calls
        return self.db.query(f"SELECT * FROM users WHERE id = {id}")  # SQL injection!
    
    def validate_user(self, user):
        # ANTI-PATTERN: Business logic in repository
        if not user.email:  # This belongs in service layer!
            raise ValueError("Email required")
"""
