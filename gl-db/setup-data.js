var defaultDepartments = [
    {"name": "Department 1"},
    {"name": "Department 2"},
    {"name": "Department 3"},
    {"name": "Department 4"}
];
var defaultLists = [
    {"name": "List 1", "username": "sue"},
    {"name": "List 2", "username": "sue"},
    {"name": "List 3", "username": "sue"},
    {"name": "List 1", "username": "bob"},
    {"name": "List 2", "username": "bob"},
    {"name": "List 3", "username": "bob"}
];
var defaultItems = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4"
];

var conn = new Mongo();
var deptDb = db.getSiblingDB('dept');
var listDb = db.getSiblingDB('list');
var itemDb = db.getSiblingDB('item');

deptDb.department.drop();
listDb.listModel.drop();
itemDb.item.drop();

deptDb.department.insert(defaultDepartments);
listDb.listModel.insert(defaultLists);

deptDb.department.find({}).forEach((dept) => {
    listDb.listModel.find({}).forEach((list) => {
        defaultItems.forEach((item) => {
            itemDb.item.insert({
                listId: list._id.str,
                departmentId: dept._id.str,
                username: list.username,
                active: true,
                quantity: 1,
                name: `${dept.name} ${item}`
            });
        });
    });