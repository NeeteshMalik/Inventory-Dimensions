import frappe


def get_shelf_qty(item_code, warehouse, shelf):
	shelf_qty = frappe.get_all(
		"Stock Ledger Entry",
		filters={"item_code": item_code, "warehouse": warehouse, "shelf": shelf},
		fields=["sum(actual_qty) as total"],
	)

	if shelf_qty:
		return shelf_qty
