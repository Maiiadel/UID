from databaseStructure import *


class UnitCost:
    def __init__(
        self,
        electricity_unit_costs="electricity_unit_costs",
        water_unit_costs="water_unit_costs",
    ):
        self.electricity_unit_costs = electricity_unit_costs
        self.water_unit_costs = water_unit_costs

    def get_unit_costs(self):
        # doesn't need to anything as water & electricity fields' ids are their names

        electricity_unit_costs = (
            db.collection("unit_cost").document(self.electricity_unit_costs).get()
        )

        water_unit_costs = (
            db.collection("unit_cost").document(self.water_unit_costs).get()
        )

        unit_costs = {
            "electricity_unit_costs": electricity_unit_costs.to_dict(),
            "water_unit_costs": water_unit_costs.to_dict(),
        }

        return unit_costs
