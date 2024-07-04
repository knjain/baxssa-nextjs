interface User {
    userId: number;
    fullName: string;
    email: string;
    phoneNumber: string | null;
  }
  
  interface CreateUserParams {
    fullName: string;
    email: string;
    phoneNumber: string;
    hashedPassword: string;
    adminName: string;
  }
  
  interface CreateUserResult {
    // Define the structure of the result based on your database response
    insertId: number;
    affectedRows: number;
    // Add more fields if necessary
  }

  ///////////////////PRODUCT TYPES/////////////////
  interface Product {
    productId: number;
    productName: string;
    productCode: string;
    productImageUrl: string;
    description: string;
    type: string;
    subType: string;
  }