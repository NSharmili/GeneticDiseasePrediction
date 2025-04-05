// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DoctorRegistry {

    struct Doctor {
        string name;
        string designation;
        bool isRegistered;
    }

    mapping(string => Doctor) private doctors;

    // Register a new doctor
    function registerDoctor(string memory _name, string memory _designation) public {
        require(bytes(_name).length > 0, "Name is required");
        require(bytes(_designation).length > 0, "Designation is required");
        require(!doctors[_name].isRegistered, "Doctor already registered");

        doctors[_name] = Doctor({
            name: _name,
            designation: _designation,
            isRegistered: true
        });
    }

    // Get doctor designation by name
    function getDoctorDetails(string memory _name) public view returns (string memory) {
        require(doctors[_name].isRegistered, "Doctor not found");
        return doctors[_name].designation;
    }
}