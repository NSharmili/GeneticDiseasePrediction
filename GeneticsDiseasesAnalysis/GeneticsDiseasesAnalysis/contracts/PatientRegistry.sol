// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PatientRegistry {
    struct Patient {
        string name;
        string relation;
        uint256 age;
        string dob;
        uint256 cholesterol;
        uint256 restECG;
        uint256 bloodPressure;
        bool exists;
    }

    mapping(string => Patient) private patients;

    event PatientRegistered(
        string name,
        string relation,
        uint256 age,
        string dob,
        uint256 cholesterol,
        uint256 restECG,
        uint256 bloodPressure
    );

    function registerPatient(
        string memory _name,
        string memory _relation,
        uint256 _age,
        string memory _dob,
        uint256 _cholesterol,
        uint256 _restECG,
        uint256 _bloodPressure
    ) public {
        require(!patients[_name].exists, "Patient already registered");

        patients[_name] = Patient(_name, _relation, _age, _dob, _cholesterol, _restECG, _bloodPressure, true);
        
        emit PatientRegistered(_name, _relation, _age, _dob, _cholesterol, _restECG, _bloodPressure);
    }

    function getPatientDetails(string memory _name)
        public
        view
        returns (string memory, string memory, uint256, string memory, uint256, uint256, uint256)
    {
        require(patients[_name].exists, "Patient not found");
        Patient memory p = patients[_name];
        return (p.name, p.relation, p.age, p.dob, p.cholesterol, p.restECG, p.bloodPressure);
    }

    function getPatientExists(string memory _name) public view returns (bool) {
        return patients[_name].exists;
    }
}
