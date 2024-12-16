import frappe

from inventory_dimensions.inventory_dimensions.customizations.delivery_note.api_calls.api_call_functions import (
	get_shelf_qty)


@frappe.whitelist()
def get_total_shelf_qty(item_code, warehouse, shelf):
	return get_shelf_qty(item_code, warehouse, shelf)
