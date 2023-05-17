from database import *


class Item:
    def __init__(self, item_id="", name="", title=""):
        self.item_id = item_id
        self.file_name = name
        self.file_reference = title

    def get_items(self):
        items = db.collection("items").get()
        all_items = []
        for item in items:
            single_item = item.to_dict()
            all_items.append(single_item)

        # items = item.to_
        # print(f"Items = {items}")
        return all_items
