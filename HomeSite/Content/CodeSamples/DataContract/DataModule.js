var DataModule = (function () {

    var errorTypes = {
        missingField: function (field, source) {
            return !source.hasOwnProperty(field) ?
                sprintf("The field %s is missing, validated with contract", field) : false;
        }
    };

    var displayErrors = function (errors) {
        if (!console) return;
        console.log("Validation errors------------------------------------------------");
        errors.foreach(function (item) {
            console.log(item);
        });
    };
    var makeContract = function (contract) {
        return function (obj) {
            var errors = [];
            for (var field in contract) {
                if (!obj.hasOwnProperty(field) || !contract[field](obj[field]))
                    return false;
            }
            //displayErrors(errors);

            return errors.length == 0;
        };
    };
    var withContract = function (contract, f) {
        return (function (x) {
            if (contract(x))
                f(x);
        });
    };

    //Load data from the url
    //Available options: 
    //requestMethod
    //isCrossDomain
    //jsonParam
    //loaded
    //error
    //scope
    var fetchData = function (url, data, contract, options) {
        //if (console && !contract)
        //    console.log(sprintf("The data from %s wont be validated because missing contract!", url));

        $.ajax({
            url: url,
            type: options.requestMethod || 'GET',
            data: data,
            dataType: options.isCrossDomain ? 'jsonp' : 'json',
            jsonp: options.jsonpParam || "callback",
            success: function (result) {
                result = result.d || result;
                if (!contract) {
                    if (options.loaded)
                        options.loaded(result);
                    return;
                }
                var validator = withContract(contract, function (res) {
                    if (options.loaded)
                        options.loaded(res);
                });
                validator(result);
            },
            error: function (exception) {
                if (console && console.error) console.error(sprintf("Requested url:'%s'", url), data);
                if (options.error)
                    options.error(exception);
            }
        });
    };

    var observable = function (initobj, contract) {
        if (console && !contract(initobj)) console.error("The initial value is validated with the contract, the type doesn't match with it!");
        var current = initobj;
        var subscribers = [];

        var value = function (obj) {
            if (obj !== undefined) {
                if (contract(obj)) {
                    current = obj;
                    subscribers.foreach(function (subscriber) { subscriber(current); });
                }
                else
                    if (console) console.error("Type mismatch!");
            }
            return current;
        };
        value.validate = function () {
            return contract(current);
        };
        value.subscribe = function (f) {
            var subscriber = function (obj) {
                f(obj);
            };
            subscribers.push(subscriber);
            return subscriber;
        };
        value.unSubscribe = function (subscriber) {
            if (subscriber !== undefined)
                subscribers.remove(function (item) {
                    return item === subscriber;
                });
            else
                subscribers = [];
        };

        return value;
    };
    return {
        fetchData: fetchData,
        makeContract: makeContract,
        withContract: withContract,
        observable: observable
    };
}());

var Contracts = (function () {
    //#region Types
    var string = function (value) {
        return typeof value === "string";
        //return { isvalid: typeof value === "string", error: sprintf("%s is not a string!", value) };
    };
    var bool = function (value) {
        return typeof value === "boolean";
        //return { isvalid: typeof value === "boolean", error: sprintf("%s is not a bool!", value) };
    };
    var numeric = function (value) {
        return $.isNumeric(value);
        //return { isvalid: $.isNumeric(value), error: sprintf("%s is not a number!", value) };
    };
    var int = function (value) {
        return typeof value === "number" && parseFloat(value) % 1 == 0;
        //return { isvalid: typeof value === "number" && parseFloat(value) % 1 == 0, error: sprintf("%s is not an integer!", value) };
    };
    var float = function (value) {
        return typeof value === "number" && parseFloat(value) % 1 != 0;
        //return { isvalid: typeof value === "number" && parseFloat(value) % 1 != 0, error: sprintf("%s is not a float!", value) };
    };
    var object = function (contract) {
        return DataModule.makeContract(contract);
    };
    var array = function (contract) {
        return (function (xs) {
            if (!$.isArray(xs))
                return false;
            return xs.length == 0 || !xs.any(function (item, index) {
                return !contract(item);
            });
        });
    };
    var enumeration = function (lst) {
        return (function (obj) {
            return lst.any(function (contract) {
                return contract(obj);
            });
        });
    };
    var any = function (value) {
        return true;
    };
    var dynamic = function (contract) {
        return (function (obj) {
            return contract(obj);
        });
    };
    var observableType = function (obs) {
        return obs.validate && obs.validate();
    };
    //#endregion

    return {
        resultContract: DataModule.makeContract({
            QueryBuildingTime: numeric,
            ResultCandidates: array(object({
                AlternativeResults: array(string),
                Category: string,
                Description: string,
                DescriptionIsEditable: bool,
                Header: string,
                Link: string,
                Result: enumeration([object({
                    __type: string,
                    Type: string,
                    Value: any
                }), object({
                    __type: string,
                    IsVerified: bool,
                    RenderingStyle: string,
                    ResultId: string,
                    TableInfo: any,
                    TableType: string,
                    Type: string
                }), object({
                    __type: string,
                    Type: string
                })]),
                ResultId: string
            })),
            ResultCandidatesGenerationTime: numeric,
            SearchId: string,
            SearchItemMatchLists: any,
            SearchString: string,
            TermMatchingTime: numeric,
            TotalTime: numeric,
        }),
        tabularContract: DataModule.makeContract({
            ColumnGroups: array(object({
                Columns: array(object({
                    Cells: array(object({
                        IsSelfEntity: bool,
                        IsSubTotal: bool,
                        IsTotal: bool,
                        Value: any
                    })),
                    IsDataColumn: bool,
                    IsDefaultCaption: bool,
                    IsIdentity: bool,
                    IsPrimary: bool,
                    Name: string,
                    Order: numeric,
                    Show: bool,
                    Type: any
                })),
                Name: string
            })),
            From: any,
            RowCount: numeric,
            To: any
        })
    };
}());