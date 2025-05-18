class ApiError extends  Error{
    constructor(statusCode,message){
        super(message);
        this.statusCode=statusCode;
        this.isOPerational=true;

        Error.captureStackTrace(this,this.constuctor);


    }

}
export  default  ApiError;