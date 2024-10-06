import { VehicleConfigs } from "./types"

const vehicleConfigs: VehicleConfigs = {
    defaults: {
        id: 'mercedes_sls',
        lift: 0,
        color: '#B91818',
        roughness: 0,
        wheel_offset: 0,
        rim: 'hre_p200',
        rim_color: 'gloss_black',
        rim_color_secondary: 'silver',
        rim_front_diameter: 19,
        rim_rear_diameter: 19,
        rim_front_width: 255,
        rim_rear_width: 275,
        tire: 'bfg_at',
        tire_aspectRatio: 30,
        spare: true,
    },  
    vehicles: {
        mercedes_sls: {
            name: 'Mercedes SLS',
            make: 'Mercedes',
            model: 'assets/models/vehicles/mercedes/sls/sls_painted.glb',  
            wheel_offset: 0.8,
            wheelbase: 2.7776,
        },
        mercedes_e63: {
            name: 'Mercedes E63',
            make: 'Mercedes',
            model: 'assets/models/vehicles/mercedes/e63.glb',  
            wheel_offset: 0.791838,
            wheelbase: 2.9,
        },
        dodge_challenger: {
            name: 'Dodge Challenger',
            make: 'Dodge',
            model: 'assets/models/vehicles/dodge/challenger.glb',  
            wheel_offset: 0.8,
            wheelbase: 2.946,  
        },
        ford_mustang: {
            name: 'Ford Mustang',
            make: 'Ford',
            model: 'assets/models/vehicles/ford/mustang.glb',  
            wheel_offset: 0.66,
            wheelbase: 2.366,  
        },
    },
    wheels: {
        rims: {
            hre_p200: { 
                make: 'HRE',
                name: 'P200',
                model: 'assets/models/wheels/rims/p200.glb',
                width: 0.5,
                od: 1
            }, 
            volks_te37: { 
                make: 'Volks',
                name: 'TE37',
                model: 'assets/models/wheels/rims/te37.glb', 
                width: 3.13868,
                od: 6.28967
            },
            hre_hc1: { 
                make: 'Vossen',
                name: 'HC-1',
                model: 'assets/models/wheels/rims/hc1.glb', 
                width: 6.5834,
                od: 14.0995
            },  
            forgiato_multato: { 
                make: 'Forgiato',
                name: 'Multato',
                model: 'assets/models/wheels/rims/multalto.glb', 
                width: 0.125,
                od: 0.252
            },  
            vossen_vfs1: { 
                make: 'Vossen',
                name: 'VFS1',
                model: 'assets/models/wheels/rims/vfs1.glb', 
                width: 33.3934,
                od: 69.7145
            },  
        }, 
        tires: {
            
            nitto_mud_grappler: {
                make: 'Samples',
                name: 'Sample 1',
                model: 'assets/models/wheels/tires/mud_grappler.glb',
                width: 0.32,
                od: 0.883,
                id: 0.48,
            },
            bfg_at: {
                make: 'Samples',
                name: 'Sample 2',
                model: 'assets/models/wheels/tires/bfg_at.glb',
                width: 0.26,
                od: 0.895,
                id: 0.43,
            },
            bfg_km3: {
                make: 'Samples',
                name: 'Sample 3',
                model: 'assets/models/wheels/tires/bfg_km3.glb',
                width: 0.267,
                od: 0.849,
                id: 0.48,
            },
            bfg_km2: {
                make: 'Samples',
                name: 'Sample 4',
                model: 'assets/models/wheels/tires/bfg_km2.glb',
                width: 0.245,
                od: 0.837,
                id: 0.44,
            },
            maxxis_trepador: {
                make: 'Samples',
                name: 'Sample 5',
                model: 'assets/models/wheels/tires/michelin.glb',
                width: 3.5,
                od: 4,
                id: 1
            }, 
            michelin_pilot_sport_4: {
                make: 'Michelin',
                name: 'Michelin',
                model: 'assets/models/wheels/tires/michelin.glb',
                width: 0.38, 
                od: 0.9177,
                id: 0.7035,
            },
        },
    },
}

export default vehicleConfigs
