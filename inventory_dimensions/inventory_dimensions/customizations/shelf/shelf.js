frappe.ui.form.on("Shelf", {
	warehouse: function (frm) {
        if (frm.doc.warehouse) {
            // Set a dynamic filter on the Rack field based on the selected Warehouse
            frm.set_query('rack', function () {
                return {
                    filters: {
                        warehouse: frm.doc.warehouse // Only show racks linked to the selected warehouse
                    }
                };
            });

            // Clear the Rack field when the Warehouse changes
            frm.set_value('rack', null);
        } else {
            // Clear Rack field if Warehouse is cleared
            frm.set_query('rack', function () {
                return {};
            });
            frm.set_value('rack', null);
        }
    }
});
