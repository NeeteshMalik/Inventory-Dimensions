frappe.ui.form.on("Delivery Note Item", {
  shelf: function (frm, cdt, cdn) {
    let row = locals[cdt][cdn];
    if (row.warehouse && row.item_code && row.shelf) {
      frappe.call({
        method:
          "inventory_dimensions.inventory_dimensions.customizations.delivery_note.delivery_note.get_total_shelf_qty",
        args: {
          item_code: row.item_code,
          warehouse: row.warehouse,
          shelf: row.shelf,
        },
        callback: function (r) {
          console.log(r.message);
          console.log(r.message["total"]);
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
      frappe.model.set_value(
        cdt,
        cdn,
        "custom_shelf_qty",
        r.message[0]["total"]
      );
    }
  },
});
