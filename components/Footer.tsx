
function Footer() {
  return (
    <div className="bg-black flex flex-col items-center">
        <div className="flex justify-around mx-25 pt-10 gap-20">
            <div className="w-100">
                <h1 className="text-xl font-bold">Eldics Store</h1>
                <p className="text-gray-400">
                    We are dedicated to providing the best service possible. Our team is
                    committed to ensuring your satisfaction with every interaction. If
                    you have any questions or concerns, please don&apos;t hesitate to
                    reach out to us. We are here to help and will do our best to address
                    any issues you may have. Thank you for choosing us, and we look
                    forward to serving you again in the future.
                </p>
            </div>
            <div>
                <h2 className="text-md font-bold">Company</h2>
                <ul className="text-gray-400">
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div>
                <h2 className="text-md font-bold">Get in touch</h2>
                <div className="text-gray-400">
                    <p>+919876543210</p>
                    <p>contact@crazy.dev</p>
                </div>
            </div>
        </div>
        <p className="mt-20 mb-5">Copyright 2026 &#169; Crazy.dev All Rights Reserved.</p>
    </div>
  )
}

export default Footer