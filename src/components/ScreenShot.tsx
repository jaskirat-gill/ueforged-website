import { useEffect, useCallback } from 'react'
import { useThree } from '@react-three/fiber'
import { PerspectiveCamera } from 'three'

export default function Screenshot() {
    const { gl, scene, camera, size, } = useThree()

    // Take screenshot.
    const takeScreenshot = useCallback(() => {
        // Fixed render size.
        const aspect = 1280 / 720
        const perspectiveCamera = camera as PerspectiveCamera
        perspectiveCamera.aspect = aspect
        camera.updateProjectionMatrix()
        gl.setSize(1280, 720)
        gl.render(scene, camera)

        // Download image.
        var link = document.createElement('a')
        link.download = 'ueforged_configurator.png'
        link.href = gl.domElement.toDataURL('image/png')
        link.click()

        // Restore canvas size.
        perspectiveCamera.aspect = size.width / size.height
        camera.updateProjectionMatrix()
        gl.setSize(size.width, size.height)
        gl.render(scene, camera)
    }, [gl, scene, camera, size])


    // Listen for screenshot event.
    useEffect(() => {
        window.addEventListener('takeScreenshot', takeScreenshot)
        return () => window.removeEventListener('takeScreenshot', takeScreenshot)
    }, [takeScreenshot])

    return null
}
