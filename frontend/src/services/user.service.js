import { createCrudService } from "./crudFactory"

// Thin wrapper over /api/users — see backend/src/users for the real contract.
export const userService = createCrudService("users")
