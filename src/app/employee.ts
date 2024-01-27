// Represents the type of data that will be returning whenever we make calls
// Just technically mirroing what employee will look like from the backend

export interface Employee{
    id:number;
    name:string;
    email:string;
    jobTitle:string;
    phone:string;
    imageUrl: string;
    employeeCode:string;
}

