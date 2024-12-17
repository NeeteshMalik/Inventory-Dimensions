frappe.ui.form.on("Delivery Note Item", {
	shelf: function (frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		if (row.warehouse && row.item_code && row.shelf) {
			frappe.call({
				method: "inventory_dimensions.inventory_dimensions.customizations.delivery_note.delivery_note.get_total_shelf_qty",
				args: {
					item_code: row.item_code,
					warehouse: row.warehouse,
					shelf: row.shelf,
				},
				callback: function (r) {
					if (r.message) {
						frappe.model.set_value(
							cdt,
							cdn,
							"custom_shelf_qty",
							r.message[0]["total"]
						);
					}
				},
			});
		} else {
			frappe.model.set_value(cdt, cdn, "custom_shelf_qty", 0);
		}
	},
});
frappe.ui.form.on("Delivery Note", {
	refresh: function (frm) {
		rack_filter_query(frm);
		shelf_filter_query(frm);
	},
});

function rack_filter_query(frm) {
	let rack_filter = [];
	frm.set_query("rack", "items", function (doc, cdt, cdn) {
		var d = locals[cdt][cdn];
		frappe.call({
			method: "inventory_dimensions.inventory_dimensions.customizations.delivery_note.delivery_note._get_rack_list",
			async: false,
			args: {
				item_code: d.item_code,
				warehouse: d.warehouse,
			},
			callback(r) {
				rack_filter = r.message;
			},
		});
		return {
			filters: {
				name: ["in", rack_filter],
			},
		};
	});
}

function shelf_filter_query(frm) {
	let shelf_filter = [];
	frm.set_query("shelf", "items", function (doc, cdt, cdn) {
		var d = locals[cdt][cdn];
		frappe.call({
			method: "inventory_dimensions.inventory_dimensions.customizations.delivery_note.delivery_note._get_shelf_list",
			async: false,
			args: {
				item_code: d.item_code,
				warehouse: d.warehouse,
			},
			callback(r) {
				shelf_filter = r.message;
			},
		});
		return {
			filters: {
				name: ["in", shelf_filter],
			},
		};
	});
}
