frappe.ui.form.on("Shelf", {
    warehouse: function (frm){
        if(frm.doc.warehouse){
            frm.set_query('rack', function () {
                return {
                    filters: {
                        warehouse: frm.doc.warehouse // Only show racks linked to the selected warehouse
                    }
                };
            });
        }
        else{
            frm.set_query('rack', function () {
                return {
                    filters: {
                        name: ["in",[]]
                    }
                };
            });

        }
       
    },
});