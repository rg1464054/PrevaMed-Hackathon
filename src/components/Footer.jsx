import { QuickLinks, Contacts, FollowUs } from '../constants'

const Footer = () => {
  return (
    <footer id="Contacts" className="mt-20 border-t py-16 border-neutral-700">
      {/* Resoure Links  */}
      <div className="flex flex-cols-2 lg:flex-cols-3 gap-4 justify-around">
        {/* Quick Links  */}
        <div>
          <h3 className="text-md font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {QuickLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="text-neutral-300 hover:text-white"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacts  */}
        <div>
          <h3 className="text-md font-semibold mb-4">Contacts</h3>
          <ul className="space-y-2">
            {Contacts.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="text-neutral-300 hover:text-white"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Follow Us  */}
        <div>
          <h3 className="text-md font-semibold mb-4">Follow Us</h3>
          <ul className="space-y-2">
            {FollowUs.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="text-neutral-300 hover:text-white"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Lisense  */}
      <div className="flex flex-col items-center m-5">
        <p>PREVAMED @ 2025</p>
        <p>
          All rights reserved. | <u>Privacy Policy</u> | <u>Terms of Service</u>
        </p>
      </div>
    </footer>
  )
}

export default Footer
