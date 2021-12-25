class APIFeatures{
    constructor(query, queryString){
        this.query = query;
        this.queryString  = queryString;
    }

    filter(){
        console.log("hello");
        console.log(this.query);
        console.log(this.queryString);
        const queryObj = {...this.queryString};
        const excludedFields = ['page','sort','limit','fields'];
        excludedFields.forEach(el => delete queryObj[el]);

        //price range filtering
        
    }
}